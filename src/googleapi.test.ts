import { suiteName, chance } from '../test/utils'
import { GooglePlaceApiStatusEnum, GooglePlaceCountry } from './const'
import { getPlaceAutocomplete, getPlaceDetails } from './googleapi'
import * as requestService from './requester'

describe(suiteName(__filename), () => {
  let requestSpy: jest.SpyInstance
  let key: string
  let address: string
  let placeId: string

  beforeEach(() => {
    requestSpy = jest.spyOn(requestService, 'request')
    key = chance.word()
    address = chance.address()
    placeId = chance.word()
  })
  afterEach(jest.restoreAllMocks)

  describe('getPlaceAutocomplete', () => {
    it('should return empty array when receiving ZERO RESULT', async () => {
      requestSpy.mockResolvedValue({
        status: GooglePlaceApiStatusEnum.ZERO_RESULTS,
      })

      await expect(getPlaceAutocomplete({ key, address })).resolves.toStrictEqual([])
      expect(requestSpy).toHaveBeenCalledTimes(1)
    })

    it('should throw error if any', async () => {
      requestSpy.mockResolvedValue({
        status: GooglePlaceApiStatusEnum.NOT_FOUND,
      })

      await expect(getPlaceAutocomplete({ key, address })).rejects.toMatchObject({
        message: `Failed to fetch auto complete for the address ${address}`,
        code: 'ERR_GG_PLACE_API_AUTOCOMPLETE_FAILED',
        address,
        status: GooglePlaceApiStatusEnum.NOT_FOUND
      })
    })

    it('should propagate error', async () => {
      const rawError = new Error(chance.string())
      requestSpy.mockRejectedValue(rawError)

      await expect(getPlaceAutocomplete({ key, address })).rejects.toEqual(rawError)
    })

    it('should fetch place autocomplete with country support', async () => {
      const placeId = chance.word()
      const description = chance.word()
      requestSpy.mockResolvedValue({
        status: GooglePlaceApiStatusEnum.OK,
        predictions: [
          {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            place_id: placeId,
            description
          }
        ]
      })

      await expect(getPlaceAutocomplete({
        key, address, country: [
          GooglePlaceCountry.Australia,
          GooglePlaceCountry.Vietnam,
        ]
      })).resolves.toStrictEqual([
        {
          placeId, description
        }
      ])

      expect(requestSpy).toHaveBeenCalledWith({
        url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
        params: {
          input: address,
          key: key,
          types: 'address',
          components: 'country:au|country:vi'
        }
      })
    })
  })

  describe('getPlaceDetails', () => {
    it('should return null when receiving ZERO RESULT', async () => {
      requestSpy.mockResolvedValue({
        status: GooglePlaceApiStatusEnum.ZERO_RESULTS,
      })

      await expect(getPlaceDetails({ key, placeId })).resolves.toStrictEqual(null)
      expect(requestSpy).toHaveBeenCalledTimes(1)
    })

    it('should throw error if any', async () => {
      requestSpy.mockResolvedValue({
        status: GooglePlaceApiStatusEnum.NOT_FOUND,
      })

      await expect(getPlaceDetails({ key, placeId })).rejects.toMatchObject({
        message: `Failed to fetch place detail of place id ${placeId}`,
        code: 'ERR_GG_PLACE_DETAIL_API_FAILED',
      })
    })

    it('should propagate error', async () => {
      const rawError = new Error(chance.string())
      requestSpy.mockRejectedValue(rawError)

      await expect(getPlaceDetails({ key, placeId })).rejects.toEqual(rawError)
    })

    it('should fetch place detail', async () => {
      requestSpy.mockResolvedValue({
        status: GooglePlaceApiStatusEnum.OK,
      })

      await expect(getPlaceDetails({
        key, placeId
      })).resolves.toBeTruthy()

      expect(requestSpy).toHaveBeenCalledWith({
        url: 'https://maps.googleapis.com/maps/api/place/details/json',
        params: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          place_id: placeId,
          key,
          fields: 'address_components,place_id,formatted_address,geometry',
        }
      })
    })
  })
})
