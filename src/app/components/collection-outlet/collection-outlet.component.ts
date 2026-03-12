import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common'

import { isEmpty, isNull, isUndefined } from 'lodash'

import { RoutePath } from '../../const'
import { CollectionItem } from '../../model'
import { CollectionStorageService } from '../../services'
import { CollectionComponent } from '../collection/collection.component'

@Component({
  standalone: true,
  selector: 'stk-collection-outlet',
  templateUrl: './collection-outlet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CollectionComponent
  ]
})
export class CollectionOutletComponent {
  readonly key = signal<RoutePath>(null)
  readonly collection = signal<CollectionItem[]>([])

  constructor (
    private readonly route: ActivatedRoute,
    private readonly collectionStorage: CollectionStorageService
  ) {
    const { key, collection } = { ... (this.route.snapshot.data as { key: RoutePath, collection: CollectionItem[] }) }
    this.key.set(key)
    this.collection.set(isUndefined(collection) || isNull(collection) || isEmpty(collection) ? this.collectionStorage.collection(this.key()) : collection)
  }
}
