import express, { Application, Response } from 'express'

import { connect } from './mongo'

// Mongoose connection
connect()

const app: Application = express()

/**
 * @api {test} /test
 */
app.get('/test', (_, res: Response) => {
  res.send('Technologies API is up and running')
})

export default app
