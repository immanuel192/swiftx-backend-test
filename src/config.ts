import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

const ConfigResolvers: Record<string, ()=>string> = {
    GOOGLE_PLACE_API_KEY: () => process.env.GOOGLE_PLACE_API_KEY || '',
}

export const config = (name: string):string=>{
  if (ConfigResolvers[name]) {
    return ConfigResolvers[name]()
  }
  throw new Error(`No config for ${name}`)
}
