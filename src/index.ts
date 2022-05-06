import { formatPlaceComponent, getPlaceAutocomplete, getPlaceDetails } from './googleapi'
import { config } from './config'
import { ENV_GOOGLE_PLACE_API_KEY } from './const'
import { PlaceSearchingOption, Places, PlacesDetailApiResult } from './interfaces'

export { Places, PlaceAddressComponent } from './interfaces'
export { GooglePlaceCountry } from './const'

export async function getAutoCompleteDetails(address: string, options: PlaceSearchingOption = {}): Promise<Places[]> {
  const apiKey = config(ENV_GOOGLE_PLACE_API_KEY)

  const res = await getPlaceAutocomplete({
    key: apiKey,
    address,
    ...options
  })

  const details = (await Promise.all(res.map(place => getPlaceDetails({ key: apiKey, placeId: place.placeId })))) as PlacesDetailApiResult[]

  const places = details
    .map((placeDetail) => {
      return {
        address: placeDetail.result.formatted_address,
        placeId: placeDetail.result.place_id,
        geometry: {
          location: {
            lat: placeDetail.result.geometry.location.lat,
            lng: placeDetail.result.geometry.location.lng
          }
        },
        component: formatPlaceComponent(placeDetail),
      }
    })

  // loop over and get details and map results
  return places
}
