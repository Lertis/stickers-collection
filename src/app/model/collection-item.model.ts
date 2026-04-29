import { RoutePath } from '../const'

/**
 * @description `has` - present in collection
 * @description `number` - order number of the sticker
 * @description `vertical` - how does sticker image placed
 */
export interface CollectionItem {
  has: boolean
  number: number
  vertical: boolean
}

export interface CollectionMeta {
  name: string
  path: RoutePath
  cover: string
  vertical: boolean
  collection?: CollectionItem[]
}
