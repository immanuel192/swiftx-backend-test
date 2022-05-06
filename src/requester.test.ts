import { suiteName, chance } from '../test/utils'
import axios from 'axios'
import { request } from './requester'

// These are end to end tests and need api key
describe(suiteName(__filename), () => {
  let getSpy: jest.SpyInstance
  let url: string
  let params: Record<string, string>

  beforeEach(() => {
    getSpy = jest.spyOn(axios, 'get')
    url = chance.url()
    params = {
      [chance.word()]: chance.word(),
    }
  })
  afterEach(jest.restoreAllMocks)

  describe('request', () => {
    it('should make get request to fetch data', async () => {
      const expectedResult = {
        [chance.word()]: chance.word(),
      }
      getSpy.mockResolvedValue({
        data: expectedResult
      })

      await expect(request({ url, params })).resolves.toStrictEqual(expectedResult)

      expect(getSpy).toHaveBeenCalledTimes(1)
      expect(getSpy).toHaveBeenCalledWith(url, {
        params
      })
    })

    it('should handle error when having response', async () => {
      const rawResponse = {
        data: chance.word(),
        status: chance.natural(),
        headers: [chance.word(), chance.word()],
      }
      getSpy.mockRejectedValue({
        response: rawResponse,
      })

      await expect(request({ url, params })).rejects.toMatchObject({
        message: `Error while fetching data from ${url}`,
        code: 'GG_PLACE_API_REQUEST_ERROR',
        data: rawResponse.data,
        status: rawResponse.status,
        headers: rawResponse.headers
      })
    })

    it('should handle error in general', async () => {
      const rawError = new Error(chance.string())
      getSpy.mockRejectedValue(rawError)

      await expect(request({ url, params })).rejects.toMatchObject({
        message: `Error while fetching data from ${url}`,
        code: 'GG_PLACE_API_REQUEST_FAILED',
      })
    })
  })
})
