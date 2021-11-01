import TechnologySchema from '../infrastructure/mongo'
import { catchAsync } from '../../shared/utils/catchAsync'
import { Request, Response } from 'express'
import { uploadFile, getFileStream } from '../../shared/services/aws'
import path from 'path'
import logos from '../../../toUpload.json'

/**
 * Get logos list
 * @public
 */
export const list = catchAsync(async (req: Request, res: Response) => {
  const logosArr = await TechnologySchema.list(req.query)
  const transformedData = logosArr.map((logo: any) => logo.transform())
  res.status(200).json(transformedData)
})

/**
 * Get logo
 * @public
 */
export const get = catchAsync(async (req: Request, res: Response) => {
  try {
    const logo = await TechnologySchema.get(req.params.id)
    console.log(logo)
    res.json(logo.transform())
  } catch (err) {
    console.log(err)
  }
})

export const findByFileKey = catchAsync(async (req: Request, res: Response) => {
  const key = req.params.fileKey
  const logo = await TechnologySchema.findOne({ fileKey: key })
  if (!logo) {
    res.status(404).json({ message: 'We could not find your image' })
  } else {
    res.header('Content-Type', 'image/svg+xml')
    const readStream = getFileStream(key)
    readStream.pipe(res)
  }
})

/**
 * Adds an object with the Logo shchema to the MongoDB
 * @param {*}
 * @returns
 */
export const add = catchAsync(async (req: Request, res: Response) => {
  await TechnologySchema.create(req.body)
  res.status(200).json({ message: 'Object correctly created' })
})

/**
 * Adds an object with the Logo  shchema + the ImageKey from AWS to the MongoDB
 * @param {*}
 * @returns
 */
export const addWithImage = catchAsync(async (req: Request, res: Response) => {
  req.body.fileKey = res.locals.fileKey
  await TechnologySchema.create(req.body)
  res.status(200).json({ message: 'Object correctly created & Image correctly uploaded' })
})

/**
 * Finds and udates an object using the standar _id parameter
 * @param {*}
 * @returns
 */
export const updateById = catchAsync(async (req: Request, res: Response) => {
  const data = await TechnologySchema.findOneAndUpdate({ _id: req.params.id }, req.body)
  res.status(200).json(data)
})

/**
 *  Finds and deletes an object using the standar _id parameter
 * @param {*}
 */
export const remove = catchAsync(async (req: Request, res: Response) => {
  await TechnologySchema.findOneAndDelete({ _id: req.params.id }, req.body)
  res.status(200).json({ message: 'Model deleted correctly' })
})

/**
 * Loads the images in AWS and creates the mongo object
 * @priavate
 */
export const bulkUpload = catchAsync(async (_req: Request, res: Response) => {
  logos.map(async (logo: any) => {
    const filePath = path.resolve(__dirname, '../../../img/' + logo.files[0])
    const file = {
      path: filePath,
      originalName: logo.files[0]
    }
    const files = await uploadFile(file)
    const logoObj = {
      name: logo.name,
      shortname: logo.shortname,
      url: logo.url,
      category: logo.category,
      fileKey: files.key
    }
    await TechnologySchema.create(logoObj)
    console.log(`Logo created: ${logo.name}`)
  })
  res.status(200).json({ message: 'Skills and iamges created correctly' })
})
