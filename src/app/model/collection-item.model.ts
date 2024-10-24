/**
 * @description `has` - present in collection
 * @description `found` - found and will buy it soon
 * @description `number` - order number of the sticker
 * @description `count` - how many of them do I have
 * @description `vertical` - how does sticker image placed
 */
export interface CollectionItem {
  has: boolean
  found: boolean
  number: number
  count: number
  vertical: boolean
}
