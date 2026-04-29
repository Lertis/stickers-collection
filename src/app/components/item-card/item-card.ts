import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core'
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
export class ItemCardComponent {
  readonly item = input.required<CollectionItem>()
  readonly key = input.required<RoutePath>()

  readonly itemChange = output<{ path: RoutePath, has: boolean, n: number }>()

  readonly isReadonly = signal<boolean>(env.production)

  readonly itemHas = computed(() => this.item().has)
  readonly isVertical = computed(() => this.item().vertical)
  readonly path = computed(() => `assets/img/${this.key()}/${this.item().number}.jpg`)
  readonly width = computed(() => this.item().vertical ? 100 : 200)
  readonly height = computed(() => this.item().vertical ? 200 : 100)

  readonly items: Array<{ has: boolean }> = [
    { has: true },
    { has: false }
  ]


  readonly change = ({ has }: { has: boolean }): void => {
    if ((has && this.item().has) || (!has && !this.item().has)) return
    this.itemChange.emit({ has, n: this.item().number, path: this.key() })
  }

  private readonly createPath = ({ key, number }: { key: RoutePath, number: number }): string => `assets/img/${key}/${number}.jpg`
}
