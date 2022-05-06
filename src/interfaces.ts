export enum GooglePlaceCountry {
  Australia = 'au',
}

export interface PlaceSearchingOption {
  country?: GooglePlaceCountry[]
}

export interface PlaceAutocompleteResult {
  status: string
  predictions: {
    description: string
    // eslint-disable-next-line @typescript-eslint/naming-convention
    place_id: string
    reference: string
  }[]
}

export interface PlacesAutoComplete {
  placeId: string
  description: string
}
