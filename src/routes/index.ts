import express from 'express'
const router = express.Router()
import tech from '../technology/application/router'

router.use('/tech', tech)

export default router
