import errCode from 'err-code'
import { DEFAULT_COUNTRY, GG_PLACE_STATUS_OK } from './const'
import { PlaceAutocompleteApiResult, PlacesAutoComplete, PlaceSearchingOption, PlacesDetailApiResult, PlaceDetailAddressComponentEnum, PlaceAddressComponent, PlacesDetailApiResultAddressComponent } from './interfaces'
import { request } from './requester'

interface GetPlaceAutoCompleteOption extends PlaceSearchingOption {
  key: string
  address: string
}

interface GetPlaceDetailOption {
  key: string
  placeId: string
}

// https://developers.google.com/places/web-service/autocomplete
export const getPlaceAutocomplete = async (options: GetPlaceAutoCompleteOption): Promise<PlacesAutoComplete[]> => {
  const autoComplete = await request<PlaceAutocompleteApiResult>({
    url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
    params: {
      input: options.address,
      key: options.key,
      types: 'address',
      components: (options?.country && options.country.length > 0) ?
        options.country.map(c => `country:${c}`).join('|') : DEFAULT_COUNTRY
    }
  })

  if (autoComplete.status !== GG_PLACE_STATUS_OK) {
    throw errCode(new Error(`Failed to fetch auto complete for the address ${options.address}`), 'ERR_GG_PLACE_API_AUTOCOMPLETE_FAILED', {
      address: options.address,
    })
  }

  return autoComplete.predictions.map((prediction) => {
    return {
      placeId: prediction.place_id,
      description: prediction.description
    }
  })
}

// https://developers.google.com/maps/documentation/places/web-service/details
export async function getPlaceDetails(options: GetPlaceDetailOption): Promise<PlacesDetailApiResult> {
  const placeDetail = await request<PlacesDetailApiResult>({
    url: 'https://maps.googleapis.com/maps/api/place/details/json',
    params: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      place_id: options.placeId,
      key: options.key,
      fields: 'address_components,place_id,formatted_address,geometry',
    }
  })
  // @todo to handle status https://developers.google.com/maps/documentation/places/web-service/details#PlacesDetailsStatus
  if (placeDetail.status !== GG_PLACE_STATUS_OK) {
    throw errCode(new Error(`Failed to fetch place detail of place id ${options.placeId}`), 'ERR_GG_PLACE_DETAIL_API_FAILED', {
      placeId: options.placeId,
    })
  }

  return placeDetail
}

type ComponentAddressLookupFunction = (addressComponent: PlacesDetailApiResultAddressComponent, placeComponent: PlaceAddressComponent) => void
const ComponentAddressLookup: Record<PlaceDetailAddressComponentEnum, ComponentAddressLookupFunction> = {
  [PlaceDetailAddressComponentEnum.SUBPREMISE]: (addressComponent, placeComponent) => {
    if (addressComponent.types.includes(PlaceDetailAddressComponentEnum.SUBPREMISE)) {
      placeComponent.unit = addressComponent.long_name
    }
  },
  [PlaceDetailAddressComponentEnum.STREET_NUMBER]: (addressComponent, placeComponent) => {
    if (addressComponent.types.includes(PlaceDetailAddressComponentEnum.STREET_NUMBER)) {
      placeComponent.streetNumber = addressComponent.long_name
    }
  },
  [PlaceDetailAddressComponentEnum.ROUTE]: (addressComponent, placeComponent) => {
    if (addressComponent.types.includes(PlaceDetailAddressComponentEnum.ROUTE)) {
      placeComponent.streetName = addressComponent.long_name
    }
  },
  [PlaceDetailAddressComponentEnum.LOCALITY]: (addressComponent, placeComponent) => {
    if (addressComponent.types.includes(PlaceDetailAddressComponentEnum.LOCALITY)) {
      placeComponent.suburb = addressComponent.long_name
    }
  },
  [PlaceDetailAddressComponentEnum.ADMIN_AREA_LEVEL_1]: (addressComponent, placeComponent) => {
    if (addressComponent.types.includes(PlaceDetailAddressComponentEnum.ADMIN_AREA_LEVEL_1)) {
      placeComponent.state = addressComponent.long_name
    }
  },
  [PlaceDetailAddressComponentEnum.COUNTRY]: (addressComponent, placeComponent) => {
    if (addressComponent.types.includes(PlaceDetailAddressComponentEnum.COUNTRY)) {
      placeComponent.country = addressComponent.long_name
    }
  },
  [PlaceDetailAddressComponentEnum.POSTCODE]: (addressComponent, placeComponent) => {
    if (addressComponent.types.includes(PlaceDetailAddressComponentEnum.POSTCODE)) {
      placeComponent.postcode = addressComponent.long_name
    }
  },
}

export const formatPlaceComponent = (placeDetail: PlacesDetailApiResult): PlaceAddressComponent => {
  const addressComponent: PlaceAddressComponent = {}
  for (const component of placeDetail.result.address_components) {
    Object.values(PlaceDetailAddressComponentEnum)
      .forEach((c) => {
        ComponentAddressLookup[c] && ComponentAddressLookup[c](component, addressComponent)
      })
  }

  return addressComponent
}
