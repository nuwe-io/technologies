import { Option } from 'fp-ts/lib/Option'
import { Categories, TechnologyTags, TechnologyTypes } from './valueObjects'

type TechnologyId = string
type TechnologyIds = TechnologyId[]
type TechnologyName = string
type Shortname = string
type Link = string

type Technology = {
  name: TechnologyName
  shortname: Shortname
  url: Link
  image: Link
  svgs: Link[]
  categories: Categories[]
  tags?: Option<TechnologyTags[]>
  type: TechnologyTypes
}

export { TechnologyId, TechnologyIds, TechnologyName, Shortname }
export { Technology }
