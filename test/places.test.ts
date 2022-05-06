import { describe } from '@jest/globals'
// import { getPlaceAutocomplete, getPlaceDetails } from '../src/googleapi'
import { getAutoCompleteDetails } from '../src/index'

// These are end to end tests and need api key
describe('Google Places E2E Tests', () => {
    describe('getAutoCompleteDetails', () => {
        it('returns a promise', () => {
            const res = getAutoCompleteDetails('50 McDougall Street, Milton')
            expect(res).toBeInstanceOf(Promise)
        })

        // it('can fetch from the autocomplete api', async () => {
        //     const res = await getAutoCompleteDetails('50 McDougall Street, Milton')
        //     const firstRes = res[0]
        //     expect(firstRes).toHaveProperty('suggestion')
        //     expect(firstRes).toHaveProperty('components')
        //     expect(firstRes.components).toHaveProperty('unit')
        //     expect(firstRes.components).toHaveProperty('street_number')
        //     expect(firstRes.components).toHaveProperty('street_name')
        //     expect(firstRes.components).toHaveProperty('suburb')
        //     expect(firstRes.components).toHaveProperty('state')
        //     expect(firstRes.components).toHaveProperty('postcode')
        //     expect(firstRes.components).toHaveProperty('country')
        // })
    })

    // describe('getPlaceAutocomplete', () => {
    //     it('can fetch from the autocomplete api', async () => {
    //         const res = await getPlaceAutocomplete(apiKey, '123 Smith Street')
    //         expect(res).toHaveLength(5)
    //     })


    //     it('handles no results', async () => {
    //         const res = await getPlaceAutocomplete(apiKey, 'asfasffasfasafsafs')
    //         expect(res).toStrictEqual([])
    //     })

    //     it('handles error', async () => {
    //         expect(getPlaceAutocomplete(apiKey, '')).rejects.toThrow()
    //     })
    // })

    // describe('getPlaceDetails', () => {

    //     it('can fetch details from place api', async () => {
    //         const res = await getPlaceDetails(apiKey, 'ChIJv4xum6VQkWsRkZTr3S0zvio')
    //         expect(res).not.toBeNull()
    //     })
    // })
})
