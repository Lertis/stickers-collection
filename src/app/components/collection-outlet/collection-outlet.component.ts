import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { isEmpty, isNull, isUndefined } from 'lodash'

import { CollectionStorageService } from '../../services'
import { RoutePath } from '../../const'
import { CollectionItem } from '../../model'

@Component({
  selector: 'stk-collection-outlet',
  templateUrl: './collection-outlet.component.html'
})
export class CollectionOutletComponent {
  constructor (
    private readonly route: ActivatedRoute,
    private readonly collectionStorage: CollectionStorageService
  ) { }

  get key (): RoutePath {
    return (this.route.snapshot.data as { key: RoutePath }).key
  }

  get collection (): CollectionItem[] {
    const collection: CollectionItem[] = (this.route.snapshot.data as { collection: CollectionItem[] }).collection
    return isUndefined(collection) || isNull(collection) || isEmpty(collection) ? this.collectionStorage.collection(this.key) : collection
  }
}
