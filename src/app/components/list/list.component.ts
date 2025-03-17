import { Component } from '@angular/core'
import { NavigationExtras, Route, Router } from '@angular/router'

import { RoutePath } from '../../const'

@Component({
  selector: 'stk-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  loading = true
  readonly collections: { name: string, path: RoutePath, cover: string, vertical: boolean }[] = [
    { name: 'Dragon Ball Z (yellow dot)', path: RoutePath.DRAGON_BALL_Z_YELLOW_DOT, cover: `./assets/img/${RoutePath.DRAGON_BALL_Z_YELLOW_DOT}/cover.jpg`, vertical: false },
    { name: 'Dragon Ball Z (red dot)', path: RoutePath.DRAGON_BALL_Z_RED_DOT, cover: `./assets/img/${RoutePath.DRAGON_BALL_Z_RED_DOT}/cover.jpg`, vertical: false },
    { name: 'Dragon Ball Z (black dot)', path: RoutePath.DRAGON_BALL_BLACK_DOT, cover: `./assets/img/${RoutePath.DRAGON_BALL_BLACK_DOT}/cover.jpg`, vertical: false },
    { name: 'Dragon Ball Z (no circle)', path: RoutePath.DRAGON_BALL_NO_CIRCLE, cover: `./assets/img/${RoutePath.DRAGON_BALL_NO_CIRCLE}/cover.jpg`, vertical: false },
    { name: 'Dragon Ball fleer (#1)', path: RoutePath.DRAGON_BALL_FLEER_1, cover: `./assets/img/${RoutePath.DRAGON_BALL_FLEER_1}/cover.jpg`, vertical: false },
    { name: 'Dragon Ball fleer (#2)', path: RoutePath.DRAGON_BALL_FLEER_2, cover: `./assets/img/${RoutePath.DRAGON_BALL_FLEER_2}/cover.jpg`, vertical: false },
    { name: 'Dragon Ball fleer (#3)', path: RoutePath.DRAGON_BALL_FLEER_3, cover: `./assets/img/${RoutePath.DRAGON_BALL_FLEER_3}/cover.jpg`, vertical: false },
    { name: 'Lion King', path: RoutePath.LION_KING, cover: `./assets/img/${RoutePath.LION_KING}/cover.jpg`, vertical: true },
    { name: 'Digimons', path: RoutePath.DIGIMONS, cover: `./assets/img/${RoutePath.DIGIMONS}/cover.jpg`, vertical: false },
    { name: 'Digimons shiny', path: RoutePath.DIGIMONS_SHINY, cover: `./assets/img/${RoutePath.DIGIMONS_SHINY}/cover.jpg`, vertical: false },
    { name: 'Jackie Chan', path: RoutePath.JACKIE_CHAN, cover: `./assets/img/${RoutePath.JACKIE_CHAN}/cover.jpg`, vertical: true },
    { name: 'Jackie Chan *', path: RoutePath.JACKIE_CHAN_STAR, cover: `./assets/img/${RoutePath.JACKIE_CHAN_STAR}/cover.jpg`, vertical: true }
  ]

  resolutionMap = new Map<RoutePath, { height: number, width: number }>()

  constructor (private readonly router: Router) {
    this.loading = true
    this.collections.forEach(({ path, vertical }) => { this.resolutionMap.set(path, { width: vertical ? 100 : 200, height: vertical ? 200 : 100 }) })
    this.loading = false
  }

  readonly width = (path: RoutePath): number => { return this.resolutionMap.get(path).width }

  readonly height = (path: RoutePath): number => { return this.resolutionMap.get(path).width }

  navigate (path: RoutePath) {
    const navigationExtras: NavigationExtras = { state: { data: path } }
    this.router.navigate([path], navigationExtras)
  }
}
