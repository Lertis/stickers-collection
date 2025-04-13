import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { forkJoin, lastValueFrom, map } from 'rxjs'

import { CollectionStorageService } from './storage.service'
import { RoutePath } from '../const'
import { CollectionItem } from '../model'

@Injectable({ providedIn: 'root' })
export class FetchCollectionsService {
  constructor (
    private readonly http: HttpClient,
    private readonly collectionStorageService: CollectionStorageService
  ) { }

  load (): Promise<void> {
    return lastValueFrom(forkJoin([
      this.http.get<CollectionItem[]>(`./assets/backup/${RoutePath.DRAGON_BALL_Z_YELLOW_DOT}.json`).pipe(
        map(collection => ({ name: 'Dragon Ball Z (yellow dot)', path: RoutePath.DRAGON_BALL_Z_YELLOW_DOT, cover: `./assets/img/${RoutePath.DRAGON_BALL_Z_YELLOW_DOT}/cover.jpg`, vertical: false, collection }))
      ),
      this.http.get<CollectionItem[]>(`./assets/backup/${RoutePath.DRAGON_BALL_Z_RED_DOT}.json`).pipe(
        map(collection => ({ name: 'Dragon Ball Z (red dot)', path: RoutePath.DRAGON_BALL_Z_RED_DOT, cover: `./assets/img/${RoutePath.DRAGON_BALL_Z_RED_DOT}/cover.jpg`, vertical: false, collection }))
      ),
      this.http.get<CollectionItem[]>(`./assets/backup/${RoutePath.DRAGON_BALL_BLACK_DOT}.json`).pipe(
        map(collection => ({ name: 'Dragon Ball Z (black dot)', path: RoutePath.DRAGON_BALL_BLACK_DOT, cover: `./assets/img/${RoutePath.DRAGON_BALL_BLACK_DOT}/cover.jpg`, vertical: false, collection }))
      ),
      this.http.get<CollectionItem[]>(`./assets/backup/${RoutePath.DRAGON_BALL_NO_CIRCLE}.json`).pipe(
        map(collection => ({ name: 'Dragon Ball Z (no circle)', path: RoutePath.DRAGON_BALL_NO_CIRCLE, cover: `./assets/img/${RoutePath.DRAGON_BALL_NO_CIRCLE}/cover.jpg`, vertical: false, collection }))
      ),
      this.http.get<CollectionItem[]>(`./assets/backup/${RoutePath.DRAGON_BALL_FLEER_1}.json`).pipe(
        map(collection => ({ name: 'Dragon Ball fleer (#1)', path: RoutePath.DRAGON_BALL_FLEER_1, cover: `./assets/img/${RoutePath.DRAGON_BALL_FLEER_1}/cover.jpg`, vertical: false, collection }))
      ),
      this.http.get<CollectionItem[]>(`./assets/backup/${RoutePath.DRAGON_BALL_FLEER_2}.json`).pipe(
        map(collection => ({ name: 'Dragon Ball fleer (#2)', path: RoutePath.DRAGON_BALL_FLEER_2, cover: `./assets/img/${RoutePath.DRAGON_BALL_FLEER_2}/cover.jpg`, vertical: false, collection }))
      ),
      this.http.get<CollectionItem[]>(`./assets/backup/${RoutePath.DRAGON_BALL_FLEER_3}.json`).pipe(
        map(collection => ({ name: 'Dragon Ball fleer (#3)', path: RoutePath.DRAGON_BALL_FLEER_3, cover: `./assets/img/${RoutePath.DRAGON_BALL_FLEER_3}/cover.jpg`, vertical: false, collection }))
      ),
      this.http.get<CollectionItem[]>(`./assets/backup/${RoutePath.LION_KING}.json`).pipe(
        map(collection => ({ name: 'Lion King', path: RoutePath.LION_KING, cover: `./assets/img/${RoutePath.LION_KING}/cover.jpg`, vertical: true, collection }))
      ),
      this.http.get<CollectionItem[]>(`./assets/backup/${RoutePath.DIGIMONS}.json`).pipe(
        map(collection => ({ name: 'Digimons', path: RoutePath.DIGIMONS, cover: `./assets/img/${RoutePath.DIGIMONS}/cover.jpg`, vertical: false, collection }))
      ),
      this.http.get<CollectionItem[]>(`./assets/backup/${RoutePath.DIGIMONS_SHINY}.json`).pipe(
        map(collection => ({ name: 'Digimons shiny', path: RoutePath.DIGIMONS_SHINY, cover: `./assets/img/${RoutePath.DIGIMONS_SHINY}/cover.jpg`, vertical: false, collection }))
      ),
      this.http.get<CollectionItem[]>(`./assets/backup/${RoutePath.JACKIE_CHAN}.json`).pipe(
        map(collection => ({ name: 'Jackie Chan', path: RoutePath.JACKIE_CHAN, cover: `./assets/img/${RoutePath.JACKIE_CHAN}/cover.jpg`, vertical: true, collection }))
      ),
      this.http.get<CollectionItem[]>(`./assets/backup/${RoutePath.JACKIE_CHAN_STAR}.json`).pipe(
        map(collection => ({ name: 'Jackie Chan *', path: RoutePath.JACKIE_CHAN_STAR, cover: `./assets/img/${RoutePath.JACKIE_CHAN_STAR}/cover.jpg`, vertical: true, collection }))
      )
    ])).then(collecitons => {
      this.collectionStorageService.init(collecitons)
    })
  }
}
