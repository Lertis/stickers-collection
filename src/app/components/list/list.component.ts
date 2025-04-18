import { Component } from '@angular/core'
import { NavigationExtras, Router } from '@angular/router'

import { cloneDeep } from 'lodash'

import { RoutePath } from '../../const'
import { CollectionItem } from '../../model'
import { CollectionStorageService } from '../../services'
import { randomFromTo } from '../../utils'

@Component({
  selector: 'stk-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  loading = true

  collections: { name: string, path: RoutePath, cover: string, vertical: boolean, collection?: CollectionItem[] }[] = []

  resolutionMap = new Map<RoutePath, { height: number, width: number }>()
  finishMap = new Map<RoutePath, number>()

  constructor (
    private readonly router: Router,
    readonly collectionStorage: CollectionStorageService
  ) {
    this.init()
  }

  readonly width = (path: RoutePath): number => { return this.resolutionMap.get(path).width }

  readonly height = (path: RoutePath): number => { return this.resolutionMap.get(path).width }

  navigate (path: RoutePath, collection: CollectionItem[]) {
    const navigationExtras: NavigationExtras = { state: { data: path, collection } }
    this.router.navigate([path], navigationExtras)
  }

  private init (): void {
    this.collections = cloneDeep(this.collectionStorage.collections)
    this.collections.forEach(({ path, vertical, collection }) => {
      this.resolutionMap.set(path, { width: vertical ? 100 : 200, height: vertical ? 200 : 100 })
      this.finishMap.set(path, this.progress(collection))
   })
    setTimeout(() => this.loading = false, randomFromTo(1, 2))
  }

  private progress (collection: CollectionItem[]): number {
    const has = collection.reduce((acc, v) => v.has ? acc + 1 : acc, 0)
    return (has / collection.length) * 100
  }
}
