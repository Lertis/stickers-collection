import { ChangeDetectionStrategy, Component, computed, input, OnChanges, output, signal, SimpleChange } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CollectionItem } from '../../model'
import { RoutePath } from '../../const'
import { env } from '../../env/dev'

@Component({
  standalone: true,
  selector: 'stk-item-card',
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule
  ]
})
export class ItemCardComponent implements OnChanges {
  readonly item = input.required<CollectionItem>()
  readonly key = input.required<RoutePath>()

  readonly itemChange = output<{ path: RoutePath, has: boolean, n: number }>()

  readonly path = signal<string>(null)
  readonly width = signal<number>(null)
  readonly height = signal<number>(null)
  readonly isReadonly = signal<boolean>(env.production)

  readonly itemHas = computed(() => this.item().has)
  readonly isVertical = computed(() => this.item().vertical)

  items: Array<{ has: boolean }> = [
    { has: true },
    { has: false }
  ]

  ngOnChanges (changes: { item: SimpleChange }): void {
    const { number, vertical } = { ...changes?.item?.currentValue as CollectionItem }
    this.path.set(this.createPath({ key: this.key(), number }))
    this.width.set(vertical ? 100 : 200)
    this.height.set(vertical ? 200 : 100)
  }

  change = ({ has }: { has: boolean }) => {
    if ((has && this.item().has) || (!has && !this.item().has)) return
    this.itemChange.emit({ has, n: this.item().number, path: this.key() })
  }

  private readonly createPath = ({ key, number }: { key: RoutePath, number: number }): string => `assets/img/${key}/${number}.jpg`
}
