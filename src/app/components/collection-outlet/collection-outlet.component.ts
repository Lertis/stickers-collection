import { Component } from '@angular/core'
import { ActivatedRoute, Route } from '@angular/router'

import { RoutePath } from '../../const'

@Component({
  selector: 'stk-collection-outlet',
  templateUrl: './collection-outlet.component.html'
})
export class CollectionOutletComponent {
  constructor (readonly route: ActivatedRoute) { }

  get key (): RoutePath {
    return (this.route.snapshot.data as { key: RoutePath }).key
  }
}
