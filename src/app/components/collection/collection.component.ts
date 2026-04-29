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

  readonly list = computed(() => {
    const { has, absent } = this.filterState()
    const all = this.collection()
    if (!has && !absent) return all
    return all
      .filter(item => (has && item.has) || (absent && !item.has))
      .sort((a, b) => a.number - b.number)
  })

  readonly filterState = signal<{ has: boolean, absent: boolean }>({ has: false, absent: false })

  readonly hasAmount = computed(() => this.collection().filter(({ has }) => has).length)
  readonly absentAmount = computed(() => this.collection().length - this.hasAmount())

  constructor (
    private readonly storage: CollectionStorageService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit (): void {
    this.initFiltersFromQuery()
  }

  readonly back = (): void => { this.router.navigate([`/${RoutePath.LIST}`]) }

  readonly change = (e: { path: RoutePath, has: boolean, n: number }) => {
    this.storage.change({ ...e })
  }

  readonly hasFilter = (): void => {
    if (this.hasAmount() <= 0) return
    this.filterState.update(s => ({ ...s, has: !s.has }))
    this.updateQueryParams()
  }

  readonly absentFilter = (): void => {
    if (this.absentAmount() <= 0) return
    this.filterState.update(s => ({ ...s, absent: !s.absent }))
    this.updateQueryParams()
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
      this.router.navigate([], { queryParams: {}})
    }
  }
}
