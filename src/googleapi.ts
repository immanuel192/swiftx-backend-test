import { DEFAULT_COUNTRY } from './const'
import { PlaceAutocompleteResult, PlacesAutoComplete, PlaceSearchingOption } from './interfaces'
import { request } from './requester'

interface GetPlaceAutoCompleteOption extends PlaceSearchingOption {
    key: string
    address: string
}

// https://developers.google.com/places/web-service/autocomplete
export const getPlaceAutocomplete = async (options: GetPlaceAutoCompleteOption): Promise<PlacesAutoComplete[]> => {
    const autoComplete = await request<PlaceAutocompleteResult>({
        url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
        params: {
            input: options.address,
            key: options.key,
            types: 'address',
            components: (options?.country && options.country.length > 0) ?
                options.country.map(c => `country:${c}`).join('|') : DEFAULT_COUNTRY
        }
    })

    return autoComplete.predictions.map((prediction) => {
        return {
            placeId: prediction.place_id,
            description: prediction.description
        }
    })
}

// https://developers.google.com/maps/documentation/places/web-service/details
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getPlaceDetails(key: any, placeID: any): Promise<any> {
    return Promise.resolve(null)
}
