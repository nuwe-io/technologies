import mongoose from 'mongoose'

// Set mongoose Promise to Bluebird
mongoose.Promise = Promise

// Exit application on error
mongoose.connection.on('error', (err: any) => {
  console.error(`MongoDB connection error: ${err}`)
  process.exit(-1)
})

// Print mongoose logs in dev env
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true)
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
export const connect = () => {
  mongoose
    .connect(process.env.COSMOS_URI || '', {})
    .then(() => console.log(`Connection stabilished successfully to ${process.env.COSMOS_URI}`))
    .catch((err) => console.log(err))
}

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
}

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    collection.deleteMany({})
  }
}

export const close = () => mongoose.disconnect()
