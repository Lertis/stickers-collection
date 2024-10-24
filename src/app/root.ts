import { Component } from '@angular/core'

import { CollectionStorageService } from './services'
import { CollectionItem, ItemChange } from './model'

@Component({
  selector: 'dbz-root',
  templateUrl: './root.html',
  styleUrls: ['./root.scss']
})
export class RootComponent {
  list: CollectionItem[] = []

  constructor (private readonly storage: CollectionStorageService) {
    this.list = this.storage.get()
  }

  readonly trackBy = (i: number): number => i

  readonly change = (e: ItemChange & { number: number }) => this.storage.change({ ...e })
}
