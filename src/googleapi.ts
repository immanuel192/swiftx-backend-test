import axios from 'axios'

// https://developers.google.com/places/web-service/autocomplete
export async function getPlaceAutocomplete(key: string, address: string) {
    const autocomplete = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
        params: {
            input: address,
            key: key,
            types: 'address'
        }
    })
    return autocomplete.data.predictions.map((prediction: any) => {
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
