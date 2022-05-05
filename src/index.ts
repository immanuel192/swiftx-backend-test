
import { getPlaceAutocomplete } from './googleapi'

export async function getAutoCompleteDetails(address: any): Promise<any> {
    const apiKey = process.env.GOOGLE_PLACE_API_KEY!
    // get autocomplete results
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = getPlaceAutocomplete(apiKey, address).then(async (autocompleteResults: any) => {
        const res:string[] = []
        return res
    })
    
    // loop over and get details and map results
    return res
}
