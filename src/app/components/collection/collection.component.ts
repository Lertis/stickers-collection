import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, input, OnInit, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { RoutePath } from '../../const'
import { CollectionItem } from '../../model'
import { CollectionStorageService } from '../../services'
import { ItemCardComponent } from '../item-card/item-card'

@Component({
  standalone: true,
  selector: 'stk-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ItemCardComponent
  ]
})
export class CollectionComponent implements OnInit {
  readonly key = input.required<RoutePath>()
  readonly collection = input.required<CollectionItem[]>()

  readonly list = signal<CollectionItem[]>([])
  readonly filterState = signal<{ has: boolean, absent: boolean }>({ has: false, absent: false })

  readonly hasAmount = computed(() => this.collection().filter(({ has }) => has).length)
  readonly absentAmount = computed(() => this.collection().length - this.hasAmount())

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

  readonly back = (): void => { this.router.navigate([`/${RoutePath.LIST}`]) }

  readonly change = (e: { path: RoutePath, has: boolean, n: number }) => {
    this.storage.change({ ...e })
    this.setFilters()
  }

  readonly setFilters = (): void => {
    const { has, absent } = { ...this.filterState() }
    if (Object.values({ has, absent }).every(v => !v)) {
      this.list.set(this.collection())
      return
    }

    let list: CollectionItem[] = []
    if (has) list = list.concat(this.collection().filter(({ has }) => has))
    if (absent) list = list.concat(this.collection().filter(({ has }) => !has))
    list.sort((a, b) => a.number - b.number)
    this.list.set(list)
  }

  readonly hasFilter = (): void => {
    if (this.hasAmount() <= 0) return
    const filterState = this.filterState()
    this.filterState.set({ ...filterState, has: !filterState.has })
    this.updateQueryParams()
    this.setFilters()
  }

  readonly absentFilter = (): void => {
    if (this.absentAmount() <= 0) return
    const filterState = this.filterState()
    this.filterState.set({ ...filterState, absent: !filterState.absent })
    this.updateQueryParams()
    this.setFilters()
  }

  private readonly initFiltersFromQuery = (): void => {
    const queryParams = this.route.snapshot.queryParams as { has: 'true' | 'false' }
    const hasParam = queryParams.has
    if (hasParam === 'true') {
      this.filterState.set({ has: true, absent: false })
    } else if (hasParam === 'false') {
      this.filterState.set({ has: false, absent: true })
    } else {
      this.filterState.set({ has: false, absent: false })
    }
  }

  private readonly updateQueryParams = (): void => {
    const { has, absent } = this.filterState()

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

  private readonly initProps = (): void => this.list.set(this.collection())
}
