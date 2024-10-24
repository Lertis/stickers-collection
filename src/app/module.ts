import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { NgSelectModule } from '@ng-select/ng-select'

import { RootComponent } from './root'
import { ItemCardComponent } from './components/item-card/item-card'

@NgModule({
  declarations: [
    RootComponent,
    ItemCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule { }
