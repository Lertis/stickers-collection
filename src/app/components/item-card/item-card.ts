import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChange } from '@angular/core'

import { CollectionItem, ItemChange } from '../../model'

@Component({
  selector: 'dbz-item-card',
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent implements OnChanges {
  @Input({ required: true }) item: CollectionItem

  @Output() itemChange = new EventEmitter<ItemChange & { number: number }>()

  path: string

  selected: ItemChange
  items: Array<ItemChange> = [
    { has: true, found: false },
    { has: false, found: true },
    { has: false, found: false },
  ];

  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  ngOnChanges (changes: { item: SimpleChange }): void {
    const { number, has, found } = { ...changes?.item?.currentValue as CollectionItem }
    this.path = this.createPath(number)
    this.selected = { has, found }
    this.cdr.markForCheck()
  }

  change = (e: ItemChange) => this.itemChange.emit({ ...e, number: this.item.number })

  private readonly createPath = (n: number): string => `assets/img/${n}.jpg`
}
