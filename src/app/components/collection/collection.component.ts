import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { BehaviorSubject } from 'rxjs'

import { CollectionStorageService } from '../../services'
import { CollectionItem } from '../../model'
import { RoutePath } from '../../const'

@Component({
  selector: 'stk-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  @Input({ required: true }) key: RoutePath
  @Input({ required: true }) collection: CollectionItem[] = []

  list$: BehaviorSubject<CollectionItem[]> = new BehaviorSubject<CollectionItem[]>([])

  filterState: { has: boolean, absent: boolean } = { has: false, absent: false }

  constructor (
    private readonly storage: CollectionStorageService,
    private readonly router: Router
  ) { }

  ngOnInit (): void {
    this.initProps()
    this.setFilters()
  }

  get has (): number { return this.collection.filter(({ has }) => has).length }

  get absent (): number { return this.collection.length - this.has }

  readonly back = (): void => { this.router.navigate([`/${RoutePath.LIST}`]) }

  readonly trackBy = (i: number): number => i

  readonly change = (e: { path: RoutePath, has: boolean, n: number }) => {
    this.storage.change({ ...e })
    this.setFilters()
  }

  readonly setFilters = (): void => {
    const { has, absent } = { ...this.filterState }
    if (Object.values({ has, absent }).every(v => !v)) {
      this.list$.next(this.collection)
      return
    }

    let list: CollectionItem[] = []
    if (has) list = list.concat(this.collection.filter(({ has }) => has))
    if (absent) list = list.concat(this.collection.filter(({ has }) => !has))
    list.sort((a, b) => a.number - b.number)
    this.list$.next(list)
  }

  readonly hasFilter = (): void => {
    if (this.has <= 0) return
    this.filterState = { ...this.filterState, has: !this.filterState.has }
    this.setFilters()
  }

  readonly absentFilter = (): void => {
    if (this.absent <= 0) return
    this.filterState = { ...this.filterState, absent: !this.filterState.absent }
    this.setFilters()
  }

  private readonly initProps = (): void => this.list$.next(this.collection)
}
