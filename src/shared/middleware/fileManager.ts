import { uploadFile } from '../services/aws'

import fs from 'fs'
import util from 'util'
import { catchAsync } from '../utils/catchAsync'
import { Response, NextFunction } from 'express'

const unlinkFile = util.promisify(fs.unlink)

export const getKeyFromAWS = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  const file = req.file

  const result = await uploadFile(file)

  await unlinkFile(file.path)
  res.locals.fileKey = result.Key
  next()
})
