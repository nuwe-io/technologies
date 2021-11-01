import { catchAsync } from '../../shared/utils/catchAsync'
import { Request, Response } from 'express'
import { uploadFile, getFileStream } from '../../shared/services/aws'
import path from 'path'
import logos from '../../../toUpload.json'
import Technology from '../infrastructure/mongo'

/**
 * Get Technologies list
 * @public
 */
export const list = catchAsync(async (_req: Request, res: Response) => {
  const logosArr = await Technology.find({})
  const transformedData = logosArr.map((logo: any) => logo.transform())
  res.status(200).json(transformedData)
})

/**
 * Get Technology by id
 * @public
 */
export const get = catchAsync(async (req: Request, res: Response) => {
  try {
    const logo = await Technology.findById(req.params.id)
    res.json(logo)
  } catch (err) {
    console.log(err)
  }
})

/**
 * @description findByFielKey
 *
 */
export const findByFileKey = catchAsync(async (req: Request, res: Response) => {
  const key = req.params.fileKey
  const logo = await Technology.findOne({ fileKey: key })
  if (!logo) {
    res.status(404).json({ message: 'We could not find your image' })
  } else {
    res.header('Content-Type', 'image/svg+xml')
    const readStream = getFileStream(key)
    readStream.pipe(res)
  }
})

/**
 * Adds an object with the Technology shchema to the MongoDB
 * @param {*}
 * @returns
 */
export const add = catchAsync(async (req: Request, res: Response) => {
  await Technology.create(req.body)
  res.status(200).json({ message: 'Object correctly created' })
})

/**
 * Adds an object with the Technology  shchema + the ImageKey from AWS to the MongoDB
 * @param {*}
 * @returns
 */
export const addWithImage = catchAsync(async (req: Request, res: Response) => {
  req.body.fileKey = res.locals.fileKey
  await Technology.create(req.body)
  res.status(200).json({ message: 'Object correctly created & Image correctly uploaded' })
})

/**
 * Finds and udates an object using the standar _id parameter
 * @param {*}
 * @returns
 */
export const updateById = catchAsync(async (req: Request, res: Response) => {
  const data = await Technology.findOneAndUpdate({ _id: req.params.id }, req.body)
  res.status(200).json(data)
})

/**
 *  Finds and deletes an object using the standar _id parameter
 * @param {*}
 */
export const remove = catchAsync(async (req: Request, res: Response) => {
  await Technology.findOneAndDelete({ _id: req.params.id }, req.body)
  res.status(200).json({ message: 'Model deleted correctly' })
})

/**
 * Loads the images in AWS and creates the mongo object
 * @priavate
 */
export const bulkUpload = catchAsync(async (_req: Request, res: Response) => {
  logos.forEach(async (technology: any) => {
    const filePath = path.resolve(__dirname, '../../../img/' + technology.file)
    const file = {
      path: filePath,
      originalName: technology.file
    }
    const files = await uploadFile(file)
    const logoObj = {
      name: technology.name,
      shortname: technology.shortname,
      url: technology.url,
      image: files.key,
      categories: technology.categories,
      tags: technology.tags,
      type: technology.type
    }
    await Technology.create(logoObj)
    console.log(`Technology created: ${technology.name}`)
  })
  res.status(200).json({ message: 'Skills and iamges created correctly' })
})
