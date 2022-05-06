import * as path from 'path'

export const suiteName = (file: string): string => path.relative(`${__dirname}/../..`, file).split(path.sep).join('#')
