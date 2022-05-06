import { suiteName, chance } from '../test/utils'
import { config } from './config'

describe(suiteName(__filename), () => {
  it('should return config value for GOOGLE_PLACE_API_KEY', () => {
    const expectedValue = chance.word()
    const backup = process.env.GOOGLE_PLACE_API_KEY
    process.env.GOOGLE_PLACE_API_KEY = expectedValue
    expect(config('GOOGLE_PLACE_API_KEY')).toEqual(expectedValue)
    process.env.GOOGLE_PLACE_API_KEY = backup
  })

  it('should return empty value if no value set', () => {
    const backup = process.env.GOOGLE_PLACE_API_KEY
    delete process.env.GOOGLE_PLACE_API_KEY
    expect(config('GOOGLE_PLACE_API_KEY')).toEqual('')
    process.env.GOOGLE_PLACE_API_KEY = backup
  })

  it('throw error if config not specify', () => {
    const configName = chance.word()
    expect(() => config(configName)).toThrow(`No config for ${configName}`)
  })
})
