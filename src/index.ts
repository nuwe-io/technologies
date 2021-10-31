import app from './config/express'

const PORT = process.env.PORT

// listen to requests
const server = app.listen(PORT, () => {
  return console.log(`server is running on PORT ${PORT}`)
})

export default server
