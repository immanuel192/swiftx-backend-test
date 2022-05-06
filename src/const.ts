export const ENV_GOOGLE_PLACE_API_KEY = 'GOOGLE_PLACE_API_KEY'

export const DEFAULT_COUNTRY = 'country:au'

export enum GooglePlaceApiStatusEnum {
  OK = 'OK',
  ZERO_RESULTS = 'ZERO_RESULTS',
  NOT_FOUND = 'NOT_FOUND',
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

export enum GooglePlaceCountry {
  Australia = 'au',
  Vietnam = 'vi',
}
