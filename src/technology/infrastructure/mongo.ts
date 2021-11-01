import mongoose from 'mongoose'

import { Technology } from '../domain/entities'
import { Categories, TechnologyTags, TechnologyTypes } from '../domain/valueObjects'

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
technologySchema.methods.transform = function () {
  const transformed: any = {}
  const fields = ['id', 'name', 'image', 'url', 'shortname', 'svgs', 'categories', 'tags', 'type']

  fields.forEach((field) => {
    transformed[field] = this[field]
  })

  return transformed
}

export default mongoose.model<Technology>('Technology', technologySchema)
