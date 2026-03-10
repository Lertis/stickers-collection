import { Component, Input, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

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
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit (): void {
    this.initProps()
    this.initFiltersFromQuery()
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
    this.updateQueryParams()
    this.setFilters()
  }

  readonly absentFilter = (): void => {
    if (this.absent <= 0) return
    this.filterState = { ...this.filterState, absent: !this.filterState.absent }
    this.updateQueryParams()
    this.setFilters()
  }

  private readonly initFiltersFromQuery = (): void => {
    const queryParams = this.route.snapshot.queryParams as { has: 'true' | 'false' }
    const hasParam = queryParams.has
    if (hasParam === 'true') {
      this.filterState = { has: true, absent: false }
    } else if (hasParam === 'false') {
      this.filterState = { has: false, absent: true }
    } else {
      this.filterState = { has: false, absent: false }
    }
  }

  private readonly updateQueryParams = (): void => {
    const { has, absent } = this.filterState

    if (has && absent) {
      this.router.navigate([], { queryParams: {}, queryParamsHandling: '' })
    } else if (has) {
      this.router.navigate([], { queryParams: { has: true }, queryParamsHandling: 'merge' })
    } else if (absent) {
      this.router.navigate([], { queryParams: { has: false }, queryParamsHandling: 'merge' })
    } else {
      this.router.navigate([], { queryParams: {}, queryParamsHandling: 'merge' })
    }
  }

  private readonly initProps = (): void => this.list$.next(this.collection)
}
