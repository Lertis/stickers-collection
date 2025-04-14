import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChange } from '@angular/core'

import { CollectionItem } from '../../model'
import { RoutePath } from '../../const'
import { env } from '../../env/dev'

@Component({
  selector: 'stk-item-card',
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent implements OnChanges {
  @Input({ required: true }) item: CollectionItem
  @Input({ required: true }) key: RoutePath

  @Output() itemChange = new EventEmitter<{ path: RoutePath, has: boolean, n: number }>()

  visible = false
  path: string
  width: number
  height: number
  readonly = env.production

  items: Array<{ has: boolean }> = [
    { has: true },
    { has: false }
  ]

  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  ngOnChanges (changes: { item: SimpleChange }): void {
    const { number, has, vertical } = { ...changes?.item?.currentValue as CollectionItem }
    this.path = this.createPath(number)
    this.width = vertical ? 100 : 200
    this.height = vertical ? 200 : 100
    this.visible = true
    this.cdr.markForCheck()
  }

  change = ({has}: { has: boolean }) => {
    if (has && this.item.has) return
    if (!has && !this.item.has) return
    this.itemChange.emit({ has, n: this.item.number, path: this.key })
  }

  private readonly createPath = (n: number): string => `assets/img/${this.key}/${n}.jpg`
}
