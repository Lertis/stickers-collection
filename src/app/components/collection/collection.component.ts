import { Component, Input, OnInit } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

import { CollectionStorageService } from '../../services'
import { CollectionItem, ItemChange } from '../../model'
import { RoutePath } from '../../const'

@Component({
  selector: 'stk-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  @Input({ required: true }) key: RoutePath

  list$: BehaviorSubject<CollectionItem[]> = new BehaviorSubject<CollectionItem[]>([])

  filterState: { has: boolean, delivery: boolean, absent: boolean } = { has: false, delivery: false, absent: false }

  private list: CollectionItem[] = []

  constructor (private readonly storage: CollectionStorageService) { }

  ngOnInit (): void {
    this.initStorage()
    this.updateList()
    this.setFilters()
  }

  get has (): number { return this.list.filter(({ has }) => has).length }

  get found (): number { return this.list.filter(({ found }) => found).length }

  get absent (): number { return this.list.length - this.found - this.has }

  readonly trackBy = (i: number): number => i

  readonly change = (e: ItemChange & { number: number }) => {
    this.storage.change({ ...e })
    this.updateList()
    this.setFilters()
  }

  readonly setFilters = (): void => {
    const { has, delivery, absent } = { ...this.filterState }
    if (Object.values({ has, delivery, absent }).every(v => !v)) {
      this.list$.next(this.list)
      return
    }
    let list: CollectionItem[] = []
    if (has) list = list.concat(this.list.filter(({ has }) => has))
    if (delivery) list = list.concat(this.list.filter(({ found }) => found))
    if (absent) list = list.concat(this.list.filter(({ has, found }) => !has && !found))
    list.sort((a, b) => a.number - b.number)
    this.list$.next(list)
  }

  readonly hasFilter = (): void => {
    if (this.has <= 0) return
    this.filterState = { ...this.filterState, has: !this.filterState.has }
    this.setFilters()
  }

  readonly inDeliveryFilter = (): void => {
    if (this.found <= 0) return
    this.filterState = { ...this.filterState, delivery: !this.filterState.delivery }
    this.setFilters()
  }

  readonly absentFilter = (): void => {
    if (this.absent <= 0) return
    this.filterState = { ...this.filterState, absent: !this.filterState.absent }
    this.setFilters()
  }

  readonly updateList = (): void => {
    this.list = this.storage.get()
    this.list$.next(this.list)
  }

  private readonly initStorage = (): void => { this.storage.key = this.key }
}
