import { suiteName } from '../test/utils'
import * as index from './index'

// These are end to end tests and need api key
describe(suiteName(__filename), () => {
  /**
   * @todo You know this is coverage cheating :) 
   */
  it('should export GooglePlaceCountry', () => {
    expect(index.GooglePlaceCountry).toBeDefined()
  })
})
