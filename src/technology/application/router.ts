import { Router } from 'express'

import multer from 'multer'

import { getKeyFromAWS } from '../../shared/middleware/fileManager'
import { add, list, get, remove, updateById, findByFileKey, bulkUpload, getTechnologyEnums } from './controller'

const router = Router()
const upload = multer({ dest: 'uploads/' })

/**
 * @api {post} /tech/withImage Add with image
 * @apiDescription Add a new database object + upload the Technology image to AWS
 * @apiName AddImageLogo
 * @apiGroup Technologies
 * @apiPermission public
 */
router.post('/withImage', upload.single('image'), getKeyFromAWS, (req, res) => {
  res.send(req.body)
})

/**
 * @api {get} /get Get all technology enums
 * @apiName GetTechnologyEnums
 * @apiGroup Technology
 * @apiDescription Get all technology enums
 * @apiParam {type} key can be tags, types, categories
 * @example http://localhost:3001/tech/get?type=tags
 */
router.get('/get', getTechnologyEnums)

/**
 * @api {get} /tech/:fileKey Find Technology file
 * @apiDescription Returns the requested file using the fileKey(name)
 * @apiName GetTechnology
 * @apiGroup Technologies
 * @apiPermission public
 *
 */
router.get('/:fileKey', findByFileKey)

/**
 * @api {post} /tech Add Technology
 * @apiDescription Add the database object using the id
 * @apiName AddTechnology
 * @apiGroup Technologies
 * @apiPermission public
 */
router.post('/', add)

/**
 * @api {patch} /tech/{id} Upadte Technology
 * @apiDescription Upadate the database object using the id
 * @apiName Upadate
 * @apiGroup Technologies
 * @apiPermission public
 */
router.patch('/:id', updateById)
/**
 * @api {delete} /tech/{id} Delete Technology
 * @apiDescription Deleted the database object using the id
 * @apiName DeleteTechnology
 * @apiGroup Technologies
 * @apiPermission public
 */
router.delete('/:id', remove)

/**
 * @api {get} /tech/find/all Find all
 * @apiDescription  Returns all the database objects
 * @apiName GetTechnologies
 * @apiGroup Technologies
 * @apiPermission public
 */
router.get('/find/all', list)

/**
 * @api {get} /tech/find/:id Find by Id
 * @apiDescription  Returns the database object looking by the id
 * @apiName GetTechnology
 * @apiGroup Technologies
 * @apiPermission public
 */
router.get('/find/:id', get)

/**
 * @api {get} /tech/bulk Upload bulk technologies
 * @apiDescription  Uploads a list of technologies and creates the object at mongo
 * @apiName BulkUpload
 * @apiGroup Technologies
 * @apiPermission public
 */
router.post('/bulkUpload', bulkUpload)

export default router
