import { Component } from '@angular/core'
import { NavigationExtras, Router } from '@angular/router'

import { RoutePath } from '../../const'

@Component({
  selector: 'stk-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  readonly collections: { name: string, path: RoutePath, cover: string, vertical: boolean }[] = [
    { name: 'Dragon Ball Z (yellow dot)', path: RoutePath.DRAGON_BALL_Z_YELLOW_DOT, cover: `./assets/img/${RoutePath.DRAGON_BALL_Z_YELLOW_DOT}/cover.jpg`, vertical: true },
    { name: 'Dragon Ball Z (red dot)', path: RoutePath.DRAGON_BALL_Z_RED_DOT, cover: `./assets/img/${RoutePath.DRAGON_BALL_Z_RED_DOT}/cover.jpg`, vertical: true },
    { name: 'Dragon Ball Z (black dot)', path: RoutePath.DRAGON_BALL_BLACK_DOT, cover: `./assets/img/${RoutePath.DRAGON_BALL_BLACK_DOT}/cover.jpg`, vertical: true },
    { name: 'Dragon Ball Z (no circle)', path: RoutePath.DRAGON_BALL_NO_CIRCLE, cover: `./assets/img/${RoutePath.DRAGON_BALL_NO_CIRCLE}/cover.jpg`, vertical: true },
    { name: 'Dragon Ball fleer (#1)', path: RoutePath.DRAGON_BALL_FLEER_1, cover: `./assets/img/${RoutePath.DRAGON_BALL_FLEER_1}/cover.jpg`, vertical: true },
    { name: 'Dragon Ball fleer (#2)', path: RoutePath.DRAGON_BALL_FLEER_2, cover: `./assets/img/${RoutePath.DRAGON_BALL_FLEER_2}/cover.jpg`, vertical: true },
    { name: 'Dragon Ball fleer (#3)', path: RoutePath.DRAGON_BALL_FLEER_3, cover: `./assets/img/${RoutePath.DRAGON_BALL_FLEER_3}/cover.jpg`, vertical: true },
    { name: 'Lion King', path: RoutePath.LION_KING, cover: `./assets/img/${RoutePath.LION_KING}/cover.jpg`, vertical: false },
    { name: 'Digimons', path: RoutePath.DIGIMONS, cover: `./assets/img/${RoutePath.DIGIMONS}/cover.jpg`, vertical: true },
    { name: 'Digimons shiny', path: RoutePath.DIGIMONS_SHINY, cover: `./assets/img/${RoutePath.DIGIMONS_SHINY}/cover.jpg`, vertical: true },
    { name: 'Jackie Chan', path: RoutePath.JACKIE_CHAN, cover: `./assets/img/${RoutePath.JACKIE_CHAN}/cover.jpg`, vertical: false }
  ]

  constructor (private readonly router: Router) { }

  navigate (path: RoutePath) {
    const navigationExtras: NavigationExtras = { state: { data: path } }
    this.router.navigate([path], navigationExtras)
  }
}
