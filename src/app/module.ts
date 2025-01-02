import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Route, RouterModule } from '@angular/router'

import { NgSelectModule } from '@ng-select/ng-select'

import { RootComponent } from './root'
import { ListComponent } from './components/list/list.component'
import { CollectionOutletComponent } from './components/collection-outlet/collection-outlet.component'
import { CollectionComponent } from './components/collection/collection.component'
import { ItemCardComponent } from './components/item-card/item-card'

import { RoutePath } from './const'

const routes: Route[] = [
  {
    path: '',
    redirectTo: RoutePath.LIST,
    pathMatch: 'full'
  },
  {
    path: RoutePath.LIST,
    component: ListComponent
  },
  {
    path: RoutePath.DRAGON_BALL_Z_YELLOW_DOT,
    component: CollectionOutletComponent,
    data: { key: RoutePath.DRAGON_BALL_Z_YELLOW_DOT }
  },
  {
    path: RoutePath.DRAGON_BALL_Z_RED_DOT,
    component: CollectionOutletComponent,
    data: { key: RoutePath.DRAGON_BALL_Z_RED_DOT }
  },
  {
    path: RoutePath.DRAGON_BALL_BLACK_DOT,
    component: CollectionOutletComponent,
    data: { key: RoutePath.DRAGON_BALL_BLACK_DOT }
  },
  {
    path: RoutePath.DRAGON_BALL_NO_CIRCLE,
    component: CollectionOutletComponent,
    data: { key: RoutePath.DRAGON_BALL_NO_CIRCLE }
  },
  {
    path: RoutePath.DRAGON_BALL_FLEER_1,
    component: CollectionOutletComponent,
    data: { key: RoutePath.DRAGON_BALL_FLEER_1 }
  },
  {
    path: RoutePath.DRAGON_BALL_FLEER_2,
    component: CollectionOutletComponent,
    data: { key: RoutePath.DRAGON_BALL_FLEER_2 }
  },
  {
    path: RoutePath.DRAGON_BALL_FLEER_3,
    component: CollectionOutletComponent,
    data: { key: RoutePath.DRAGON_BALL_FLEER_3 }
  },
  {
    path: RoutePath.LION_KING,
    component: CollectionOutletComponent,
    data: { key: RoutePath.LION_KING }
  },
  {
    path: RoutePath.DIGIMONS,
    component: CollectionOutletComponent,
    data: { key: RoutePath.DIGIMONS }
  },
  {
    path: RoutePath.DIGIMONS_SHINY,
    component: CollectionOutletComponent,
    data: { key: RoutePath.DIGIMONS_SHINY }
  },
  {
    path: RoutePath.JACKIE_CHAN,
    component: CollectionOutletComponent,
    data: { key: RoutePath.JACKIE_CHAN }
  }
]

@NgModule({
  declarations: [
    RootComponent,
    ListComponent,
    CollectionOutletComponent,
    CollectionComponent,
    ItemCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([...routes]),
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule { }
