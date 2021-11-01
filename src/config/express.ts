import express, { Application, Response } from 'express'
import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import methodOverride from 'method-override'
import { connect } from './mongo'

// Mongoose connection
connect()

const app: Application = express()

// Documentation api
app.use(express.static('public'))

// gzip compression
app.use(compress())

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

/**
 * @api {test} /test
 */
app.get('/test', (_, res: Response) => {
  res.send('Technologies API is up and running')
})

export default app
