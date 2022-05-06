import { describe } from '@jest/globals'
import { suiteName } from '../utils'
// import { getPlaceAutocomplete, getPlaceDetails } from '../src/googleapi'
import { getAutoCompleteDetails } from '../../src/index'

// These are end to end tests and need api key
describe(suiteName(__filename), () => {
  describe('getAutoCompleteDetails', () => {
    it('returns a promise', () => {
      const res = getAutoCompleteDetails('50 McDougall Street, Milton')
      expect(res).toBeInstanceOf(Promise)
    })

    it('can fetch from the autocomplete api', async () => {
      await expect(getAutoCompleteDetails('50 McDougall Street, Milton')).resolves.toEqual(expect.arrayContaining([
        {
          address: '50 McDougall St, Milton QLD 4064, Australia',
          placeId: 'ChIJv4xum6VQkWsRkZTr3S0zvio',
          geometry: {
            location: {
              lat: -27.4714146,
              lng: 153.0063878
            }
          },
          components: {
            streetNumber: '50',
            streetName: 'McDougall Street',
            suburb: 'Milton',
            state: 'Queensland',
            postcode: '4064',
            country: 'Australia'

          }
        }
      ]))
    })

    it('should fetch address with unit', async () => {
      await expect(getAutoCompleteDetails('1/12 Hythe St')).resolves.toEqual(expect.arrayContaining([
        {
          address: '1/12 Hythe St, Mount Druitt NSW 2770, Australia',
          components: {
            country: 'Australia',
            postcode: '2770',
            state: 'New South Wales',
            streetName: 'Hythe Street',
            streetNumber: '12',
            suburb: 'Mount Druitt',
            unit: '1'
          },
          geometry: {
            location: {
              lat: -33.7633957,
              lng: 150.8193469
            }
          },
          placeId: 'Ei8xLzEyIEh5dGhlIFN0LCBNb3VudCBEcnVpdHQgTlNXIDI3NzAsIEF1c3RyYWxpYSJXGlUKUBJOCjQKMgn3k7BFWZoSaxGu41dlkV98SBoeCxDuwe6hARoUChIJrT32XoeQEmsRMH66P2t9ARwMEAwqFAoSCVPuQJpbmhJrETABaysf-54cEgEx'
        },
        {
          address: '1/12 Hythe St, Kamerunga QLD 4870, Australia',
          components: {
            country: 'Australia',
            postcode: '4870',
            state: 'Queensland',
            streetName: 'Hythe Street',
            streetNumber: '12',
            suburb: 'Kamerunga',
            unit: '1'
          },
          geometry: {
            location: {
              lat: -16.8782567,
              lng: 145.6856794
            }
          },
          placeId: 'EiwxLzEyIEh5dGhlIFN0LCBLYW1lcnVuZ2EgUUxEIDQ4NzAsIEF1c3RyYWxpYSJXGlUKUBJOCjQKMgkJbgykPmV4aREhrqpX8e4AExoeCxDuwe6hARoUChIJ8cgBgyaIeGkRICsJ0_TuABwMEAwqFAoSCQluDKQ-ZXhpETBynDRJqvrkEgEx'
        },
        {
          address: '1/12 Hythe St, Mansfield QLD 4122, Australia',
          components: {
            country: 'Australia',
            postcode: '4122',
            state: 'Queensland',
            streetName: 'Hythe Street',
            streetNumber: '12',
            suburb: 'Mansfield',
            unit: '1'
          },
          geometry: {
            location: {
              lat: -27.5400313,
              lng: 153.1073036
            }
          },
          placeId: 'EiwxLzEyIEh5dGhlIFN0LCBNYW5zZmllbGQgUUxEIDQxMjIsIEF1c3RyYWxpYSJXGlUKUBJOCjQKMgm53OUhYluRaxHryXHEHY2VWxoeCxDuwe6hARoUChIJ2-fAVA5bkWsRgDvXJ16jAhwMEAwqFAoSCeEr-yFiW5FrEXDbAB4cE_7kEgEx'
        },
        {
          address: 'Hythe St, Miami QLD 4220, Australia',
          components: {
            country: 'Australia',
            postcode: '4220',
            state: 'Queensland',
            streetName: 'Hythe Street',
            suburb: 'Miami'
          },
          geometry: {
            location: {
              lat: -28.0692275,
              lng: 153.4427708
            }
          },
          placeId: 'EiNIeXRoZSBTdCwgTWlhbWkgUUxEIDQyMjAsIEF1c3RyYWxpYSIuKiwKFAoSCfnjbhh_BJFrEbPzFuo85w1XEhQKEgmjQlcRrgSRaxFgpN7zWqMCBQ'
        },
        {
          address: '1/12 Hythe St, Croydon SA 5008, Australia',
          components: {
            country: 'Australia',
            postcode: '5008',
            state: 'South Australia',
            streetName: 'Hythe Street',
            streetNumber: '12',
            suburb: 'Croydon',
            unit: '1'
          },
          geometry: {
            location: {
              lat: -34.8975095,
              lng: 138.5696387
            }
          },
          placeId: 'EikxLzEyIEh5dGhlIFN0LCBDcm95ZG9uIFNBIDUwMDgsIEF1c3RyYWxpYSJXGlUKUBJOCjQKMgn5b8ojsMiwahG0osPH-mrPLBoeCxDuwe6hARoUChIJB1p0cr_IsGoRMAVRo1c2AxwMEAwqFAoSCe-tpyOwyLBqEdGQH6u3pQULEgEx'
        }
      ]))
    })
  })
})
