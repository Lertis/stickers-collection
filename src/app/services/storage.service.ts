import { Injectable } from '@angular/core'
import { cloneDeep } from 'lodash'

import { CollectionItem } from '../model'
import { RoutePath } from '../const'

@Injectable({ providedIn: 'root' })
export class CollectionStorageService {
  collections: { name: string, path: RoutePath, cover: string, vertical: boolean, collection?: CollectionItem[] }[] = []

  private collectionsPerKey: Record<RoutePath, CollectionItem[]> = {
    [RoutePath.DIGIMONS]: [],
    [RoutePath.DIGIMONS_SHINY]: [],
    [RoutePath.DRAGON_BALL_BLACK_DOT]: [],
    [RoutePath.DRAGON_BALL_FLEER_1]: [],
    [RoutePath.DRAGON_BALL_FLEER_2]: [],
    [RoutePath.DRAGON_BALL_FLEER_3]: [],
    [RoutePath.DRAGON_BALL_NO_CIRCLE]: [],
    [RoutePath.DRAGON_BALL_Z_RED_DOT]: [],
    [RoutePath.DRAGON_BALL_Z_YELLOW_DOT]: [],
    [RoutePath.JACKIE_CHAN]: [],
    [RoutePath.JACKIE_CHAN_STAR]: [],
    [RoutePath.LION_KING]: [],
    [RoutePath.LIST]: []
  }

  private readonly key = 'collections'

  init (collections: { name: string, path: RoutePath, cover: string, vertical: boolean, collection?: CollectionItem[] }[]) {
    this.collections = cloneDeep(collections)
    this.collections.forEach(({ path, collection }) => { this.setCollectionToMap(path, collection) })
    this.setLocalStorage()
  }

  collection (key: RoutePath): CollectionItem[] {
    return this.collectionsPerKey[key]
  }

  change = ({ path, n, has }: { path: RoutePath, n: number, has: boolean }) => {
    const collection = this.collection(path)
    const i = collection.findIndex(({ number }) => number === n)
    collection[i].has = has
    this.setCollectionToMap(path, collection)
    this.setLocalStorage()
  }

  private setLocalStorage (): void {
    localStorage.setItem(this.key, JSON.stringify(this.collectionsPerKey))
  }

  private setCollectionToMap (path: RoutePath, c: CollectionItem[]): void {
    this.collectionsPerKey = { ...this.collectionsPerKey, [path]: c }
  }
}
