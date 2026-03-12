import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NavigationExtras, Router } from '@angular/router'

import { cloneDeep } from 'lodash'

import { RoutePath } from '../../const'
import { CollectionItem } from '../../model'
import { CollectionStorageService } from '../../services'
import { randomFromTo } from '../../utils'

@Component({
  standalone: true,
  selector: 'stk-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class ListComponent {
  private readonly router: Router = inject(Router)
  private readonly collectionStorage: CollectionStorageService = inject(CollectionStorageService)

  readonly loading = signal<boolean>(true)
  readonly collection = signal<{ name: string, path: RoutePath, cover: string, vertical: boolean, collection?: CollectionItem[] }[]>([])

  resolutionMap = new Map<RoutePath, { height: number, width: number }>()
  finishMap = new Map<RoutePath, number>()

  constructor () {
    this.init()
  }

  readonly width = (path: RoutePath): number => { return this.resolutionMap.get(path).width }

  readonly height = (path: RoutePath): number => { return this.resolutionMap.get(path).width }

  navigate (path: RoutePath, collection: CollectionItem[]) {
    const navigationExtras: NavigationExtras = { state: { data: path, collection } }
    this.router.navigate([path], navigationExtras)
  }

  private init (): void {
    const clone = cloneDeep(this.collectionStorage.collections)
    clone.forEach(({ path, vertical, collection }) => {
      this.resolutionMap.set(path, { width: vertical ? 100 : 200, height: vertical ? 200 : 100 })
      this.finishMap.set(path, this.progress(collection))
    })
    this.collection.set(clone)
    setTimeout(() => this.loading.set(false), randomFromTo(1, 2))
  }

  private progress (collection: CollectionItem[]): number {
    const has = collection.reduce((acc, v) => v.has ? acc + 1 : acc, 0)
    return (has / collection.length) * 100
  }
}
