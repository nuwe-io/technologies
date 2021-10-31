import mongoose from 'mongoose'
import { omitBy, isNil } from 'lodash'

import { TechgnologyId, Technology } from 'technology/domain/entities'
import { Categories, TechnologyTags, TechnologyTypes } from 'technology/domain/valueObjects'

const Schema = mongoose.Schema

const technologySchema = new Schema<Technology>(
  {
    name: { type: String, required: true },
    shortname: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: true },
    svgs: { type: [String] },
    categories: { type: [String], enum: Categories, required: true },
    tags: { type: [String], enum: TechnologyTags },
    type: { type: String, enum: TechnologyTypes, required: true }
  },
  {
    timestamps: true
  }
)

/**
 * Methods
 */
technologySchema.method({
  transform() {
    const transformed: any = {}
    const fields = ['id', 'name', 'image', 'url', 'shortname', 'svgs', 'categories', 'tags', 'type']

    fields.forEach((field) => {
      transformed[field] = this[field]
    })

    return transformed
  }
})

/**
 * Statics
 */
technologySchema.statics = {
  /**
   * Get logo
   *
   * @param {TechgnologyId} id - The objectId of user.
   * @returns {Promise<Technology, Error>}
   */
  async get(id: TechgnologyId): Promise<Technology | Error> {
    let logo

    if (mongoose.Types.ObjectId.isValid(id)) {
      logo = await this.findById(id).exec()
    }
    if (logo) {
      return logo
    }

    throw new Error('Technology does not exist')
  },

  /**
   * List technology in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of logos to be skipped.
   * @param {number} limit - Limit number of logos to be returned.
   * @returns {Promise<Technology[]>}
   */
  list(tags, page: number = 1, perPage: number = 30): Promise<Technology[]> {
    const options = omitBy({ tags }, isNil)
    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec()
  }
}

const TechnologySchema = mongoose.model('Logo', technologySchema)
export default TechnologySchema
