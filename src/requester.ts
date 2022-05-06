import axios from 'axios'
import errCode from 'err-code'

interface RequestOption {
  url: string
  params: Record<string, string>
}

export const request = async <T = Record<string, unknown>>(options: RequestOption): Promise<T> => {
  try {
    const value = await axios.get<T>(options.url, {
      params: options.params,
    })
    return value.data
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx;
      throw errCode(new Error(`Error while fetching data from ${options.url}`), 'ERR_GG_PLACE_API_REQUEST_ERROR', {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers
      })
    }
    throw errCode(new Error(`Error while fetching data from ${options.url}`), 'ERR_GG_PLACE_API_REQUEST_FAILED')
  }
}
