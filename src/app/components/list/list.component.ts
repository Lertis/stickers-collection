import { Component } from '@angular/core'
import { NavigationExtras, Router } from '@angular/router'

import { RoutePath } from '../../const'

@Component({
  selector: 'stk-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  readonly collections: { name: string, path: RoutePath }[] = [
    { name: 'Dragon Ball Z (yellow dot)', path: RoutePath.DRAGON_BALL_Z_YELLOW_DOT },
    { name: 'Dragon Ball Z (red dot)', path: RoutePath.DRAGON_BALL_Z_RED_DOT },
    { name: 'Dragon Ball Z (black dot)', path: RoutePath.DRAGON_BALL_BLACK_DOT },
    { name: 'Dragon Ball Z (no circle)', path: RoutePath.DRAGON_BALL_NO_CIRCLE },
    { name: 'Dragon Ball fleer (#1)', path: RoutePath.DRAGON_BALL_FLEER_1 },
    { name: 'Dragon Ball fleer (#2)', path: RoutePath.DRAGON_BALL_FLEER_2 },
    { name: 'Dragon Ball fleer (#3)', path: RoutePath.DRAGON_BALL_FLEER_2 },
    { name: 'Lion King', path: RoutePath.LION_KING },
    { name: 'Digimons', path: RoutePath.DIGIMONS },
    { name: 'Digimons shiny', path: RoutePath.DIGIMONS_SHINY },
    { name: 'Jackie Chan', path: RoutePath.JACKIE_CHAN }
  ]

  constructor (private readonly router: Router) { }

  navigate (path: RoutePath) {
    const navigationExtras: NavigationExtras = { state: { data: path } }
    this.router.navigate([path], navigationExtras)
  }
}
