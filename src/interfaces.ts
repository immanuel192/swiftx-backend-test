/* eslint-disable @typescript-eslint/naming-convention */
export enum GooglePlaceCountry {
  Australia = 'au',
  Vietnam = 'vi',
}

export interface PlaceSearchingOption {
  country?: GooglePlaceCountry[]
}

export interface PlaceAutocompleteApiResult {
  status: string
  predictions: {
    description: string
    place_id: string
    reference: string
  }[]
}

export interface PlacesAutoComplete {
  placeId: string
  description: string
}

export enum PlaceDetailAddressComponentEnum {
  SUBPREMISE = 'subpremise',
  STREET_NUMBER = 'street_number',
  ROUTE = 'route',
  LOCALITY = 'locality',
  // POLITICAL = 'political',
  // ADMIN_AREA_LEVEL_2 = 'administrative_area_level_2',
  ADMIN_AREA_LEVEL_1 = 'administrative_area_level_1',
  COUNTRY = 'country',
  POSTCODE = 'postal_code',
}

export interface PlacesDetailApiResultAddressComponent {
  long_name: string
  short_name: string
  types: PlaceDetailAddressComponentEnum[]
}

export interface PlacesDetailApiResult {
  status: string
  result: {
    /**
     * Map to the place address
     */
    formatted_address: string
    place_id: string
    geometry: {
      location: {
        lat: number
        lng: number
      }
    }
    address_components: PlacesDetailApiResultAddressComponent[]
  }
}

export interface PlaceAddressComponent {
  unit?: string
  streetNumber?: string
  streetName?: string
  suburb?: string
  state?: string
  postcode?: string
  country?: string
}

export interface Places {
  placeId: string
  address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  components: PlaceAddressComponent
}
