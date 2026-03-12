import { inject } from '@angular/core'
import { FetchCollectionsService } from '../services'

export const intializeAppAccessConfig = async (): Promise<unknown> => {
  const f = inject(FetchCollectionsService)
  return await f.load()
}
