import { suiteName } from '../utils'
import { getPlaceAutocomplete, getPlaceDetails } from '../../src/googleapi'
import { config } from '../../src/config'
import { ENV_GOOGLE_PLACE_API_KEY } from '../../src/const'

describe(suiteName(__filename), () => {
  let apiKey: string

  beforeAll(() => {
    apiKey = config(ENV_GOOGLE_PLACE_API_KEY)
  })

  describe('getPlaceAutocomplete', () => {
    it('can fetch from the autocomplete api', async () => {
      await expect(getPlaceAutocomplete({
        key: apiKey,
        address: '123 Smith Street',
      })).resolves.toHaveLength(5)
    })

    it('handles zero result', async () => {
      await expect(getPlaceAutocomplete({
        key: apiKey,
        address: 'trung, NSW',
      })).resolves.toStrictEqual([])
    })
  })

  describe('getPlaceDetails', () => {
    it('can fetch details from place api', async () => {
      await expect(getPlaceDetails({
        key: apiKey,
        placeId: 'ChIJv4xum6VQkWsRkZTr3S0zvio',
      })).resolves.not.toBeNull()
    })
  })
})
