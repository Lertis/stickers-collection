import { provideHttpClient } from '@angular/common/http'
import { ApplicationConfig, inject, isDevMode, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core'
import { provideRouter, Route, withComponentInputBinding } from '@angular/router'
import { provideServiceWorker } from '@angular/service-worker'

import { RoutePath } from './app/const'
import { FetchCollectionsService } from './app/services'

const routes: Route[] = [
  {
    path: '',
    redirectTo: RoutePath.LIST,
    pathMatch: 'full'
  },
  {
    path: RoutePath.LIST,
    loadComponent: () => import("./app/components/list/list.component").then(({ ListComponent }) => ListComponent)
  },
  {
    path: RoutePath.DRAGON_BALL_Z_YELLOW_DOT,
    loadComponent: () => import("./app/components/collection-outlet/collection-outlet.component").then(({ CollectionOutletComponent }) => CollectionOutletComponent),
    data: { key: RoutePath.DRAGON_BALL_Z_YELLOW_DOT }
  },
  {
    path: RoutePath.DRAGON_BALL_Z_RED_DOT,
    loadComponent: () => import("./app/components/collection-outlet/collection-outlet.component").then(({ CollectionOutletComponent }) => CollectionOutletComponent),
    data: { key: RoutePath.DRAGON_BALL_Z_RED_DOT }
  },
  {
    path: RoutePath.DRAGON_BALL_BLACK_DOT,
    loadComponent: () => import("./app/components/collection-outlet/collection-outlet.component").then(({ CollectionOutletComponent }) => CollectionOutletComponent),
    data: { key: RoutePath.DRAGON_BALL_BLACK_DOT }
  },
  {
    path: RoutePath.DRAGON_BALL_NO_CIRCLE,
    loadComponent: () => import("./app/components/collection-outlet/collection-outlet.component").then(({ CollectionOutletComponent }) => CollectionOutletComponent),
    data: { key: RoutePath.DRAGON_BALL_NO_CIRCLE }
  },
  {
    path: RoutePath.DRAGON_BALL_FLEER_1,
    loadComponent: () => import("./app/components/collection-outlet/collection-outlet.component").then(({ CollectionOutletComponent }) => CollectionOutletComponent),
    data: { key: RoutePath.DRAGON_BALL_FLEER_1 }
  },
  {
    path: RoutePath.DRAGON_BALL_FLEER_2,
    loadComponent: () => import("./app/components/collection-outlet/collection-outlet.component").then(({ CollectionOutletComponent }) => CollectionOutletComponent),
    data: { key: RoutePath.DRAGON_BALL_FLEER_2 }
  },
  {
    path: RoutePath.DRAGON_BALL_FLEER_3,
    loadComponent: () => import("./app/components/collection-outlet/collection-outlet.component").then(({ CollectionOutletComponent }) => CollectionOutletComponent),
    data: { key: RoutePath.DRAGON_BALL_FLEER_3 }
  },
  {
    path: RoutePath.LION_KING,
    loadComponent: () => import("./app/components/collection-outlet/collection-outlet.component").then(({ CollectionOutletComponent }) => CollectionOutletComponent),
    data: { key: RoutePath.LION_KING }
  },
  {
    path: RoutePath.DIGIMONS,
    loadComponent: () => import("./app/components/collection-outlet/collection-outlet.component").then(({ CollectionOutletComponent }) => CollectionOutletComponent),
    data: { key: RoutePath.DIGIMONS }
  },
  {
    path: RoutePath.DIGIMONS_SHINY,
    loadComponent: () => import("./app/components/collection-outlet/collection-outlet.component").then(({ CollectionOutletComponent }) => CollectionOutletComponent),
    data: { key: RoutePath.DIGIMONS_SHINY }
  },
  {
    path: RoutePath.JACKIE_CHAN,
    loadComponent: () => import("./app/components/collection-outlet/collection-outlet.component").then(({ CollectionOutletComponent }) => CollectionOutletComponent),
    data: { key: RoutePath.JACKIE_CHAN }
  },
  {
    path: RoutePath.JACKIE_CHAN_STAR,
    loadComponent: () => import("./app/components/collection-outlet/collection-outlet.component").then(({ CollectionOutletComponent }) => CollectionOutletComponent),
    data: { key: RoutePath.JACKIE_CHAN_STAR }
  }
]

const intializeAppAccessConfig = async (): Promise<unknown> => {
  const f = inject(FetchCollectionsService)
  return await f.load()
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAppInitializer(() => intializeAppAccessConfig()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
}
