import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { catchError, forkJoin, lastValueFrom, map, of } from 'rxjs'

import { CollectionStorageService } from './storage.service'
import { RoutePath } from '../const'
import { CollectionItem, CollectionMeta } from '../model'

const COLLECTION_CONFIG: CollectionMeta[] = [
  { name: 'Dragon Ball Z (yellow dot)', path: RoutePath.DRAGON_BALL_Z_YELLOW_DOT, vertical: false, cover: '' },
  { name: 'Dragon Ball Z (red dot)',    path: RoutePath.DRAGON_BALL_Z_RED_DOT,    vertical: false, cover: ''},
  { name: 'Dragon Ball Z (black dot)',  path: RoutePath.DRAGON_BALL_BLACK_DOT,    vertical: false, cover: ''},
  { name: 'Dragon Ball Z (no circle)',  path: RoutePath.DRAGON_BALL_NO_CIRCLE,    vertical: false, cover: ''},
  { name: 'Dragon Ball fleer (#1)',     path: RoutePath.DRAGON_BALL_FLEER_1,      vertical: false, cover: ''},
  { name: 'Dragon Ball fleer (#2)',     path: RoutePath.DRAGON_BALL_FLEER_2,      vertical: false, cover: ''},
  { name: 'Dragon Ball fleer (#3)',     path: RoutePath.DRAGON_BALL_FLEER_3,      vertical: false, cover: ''},
  { name: 'Lion King',                  path: RoutePath.LION_KING,                vertical: true, cover: ''  },
  { name: 'Digimons',                   path: RoutePath.DIGIMONS,                 vertical: false , cover: ''},
  { name: 'Digimons shiny',             path: RoutePath.DIGIMONS_SHINY,           vertical: false, cover: '' },
  { name: 'Jackie Chan',                path: RoutePath.JACKIE_CHAN,              vertical: true, cover: ''  },
  { name: 'Jackie Chan *',              path: RoutePath.JACKIE_CHAN_STAR,         vertical: true, cover: ''  },
]

@Injectable({ providedIn: 'root' })
export class FetchCollectionsService {
  constructor (
    private readonly http: HttpClient,
    private readonly collectionStorageService: CollectionStorageService
  ) { }

  async load (): Promise<void> {
    return lastValueFrom(
      forkJoin(
        COLLECTION_CONFIG.map(meta =>
          this.http.get<CollectionItem[]>(`assets/backup/${meta.path}.json`).pipe(
            map(collection => ({
              ...meta,
              cover: `./assets/img/${meta.path}/cover.jpg`,
              collection
            })),
            catchError(() => of({
              ...meta,
              cover: `./assets/img/${meta.path}/cover.jpg`,
              collection: [] as CollectionItem[]
            }))
          )
        )
      )
    ).then(collections => {
      this.collectionStorageService.init(collections)
    })
  }
}
