import { getPlaceAutocomplete } from './googleapi'
import { config } from './config'
import { ENV_GOOGLE_PLACE_API_KEY } from './const'
import { PlaceSearchingOption, PlacesAutoComplete } from './interfaces'

export { GooglePlaceCountry, PlacesAutoComplete } from './interfaces'

export async function getAutoCompleteDetails(address: string, options: PlaceSearchingOption = {}): Promise<PlacesAutoComplete[]> {
    const apiKey = config(ENV_GOOGLE_PLACE_API_KEY)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = getPlaceAutocomplete({
        key: apiKey,
        address,
        ...options
    })

    // loop over and get details and map results
    return res
}
