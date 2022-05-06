import { GooglePlaceCountry, PlaceDetailAddressComponentEnum } from './const'

/* eslint-disable @typescript-eslint/naming-convention */
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
  component: PlaceAddressComponent
}
