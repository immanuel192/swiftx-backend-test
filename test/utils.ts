import * as path from 'path'
import Chance from 'chance'

export const chance = new Chance()
export const suiteName = (file: string): string => path.relative(`${__dirname}/../..`, file).split(path.sep).join('#')
