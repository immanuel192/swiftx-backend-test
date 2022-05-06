import { formatPlaceComponent, getPlaceAutocomplete, getPlaceDetails } from './googleapi'
import { config } from './config'
import { ENV_GOOGLE_PLACE_API_KEY } from './const'
import { PlaceSearchingOption, Places } from './interfaces'

export { GooglePlaceCountry, Places } from './interfaces'

export async function getAutoCompleteDetails(address: string, options: PlaceSearchingOption = {}): Promise<Places[]> {
  const apiKey = config(ENV_GOOGLE_PLACE_API_KEY)

  const res = await getPlaceAutocomplete({
    key: apiKey,
    address,
    ...options
  })

  const details = await Promise.all(res.map(place => getPlaceDetails({ key: apiKey, placeId: place.placeId })))

  const places: Places[] = details.map((placeDetail) => ({
    address: placeDetail.result.formatted_address,
    placeId: placeDetail.result.place_id,
    geometry: {
      location: {
        lat: placeDetail.result.geometry.location.lat,
        lng: placeDetail.result.geometry.location.lng
      }
    },
    components: formatPlaceComponent(placeDetail),
  }))

  // loop over and get details and map results
  return places
}
