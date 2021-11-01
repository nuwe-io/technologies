import express, { Application, Response } from 'express'

const PORT = process.env.PORT

const app: Application = express()

// Documentation api
app.use(express.static('public'))

app.get('/user', (_, res: Response) => {
  res.send('NUWE API is up and running')
})

app.listen(PORT, () => {
  return console.log(`server is running on PORT ${PORT}`)
})
