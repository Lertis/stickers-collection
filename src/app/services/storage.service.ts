import { Injectable } from '@angular/core'
import { CollectionItem } from '../model'

@Injectable({ providedIn: 'root' })
export class CollectionStorageService {
  private readonly key = 'dbz'

  get (): CollectionItem[] {
    return JSON.parse(localStorage.getItem(this.key))
  }

  set (collection: CollectionItem[]): void {
    localStorage.setItem(this.key, JSON.stringify(collection))
  }

  change = ({ number, has, found }: { number: number, has: boolean, found: boolean }) => {
    const all = this.get()
    const i = this.index(number)
    all[i].found = found
    all[i].has = has
    this.set(all)
  }

  count (n: number, v: number) {
    const all = this.get()
    const i = this.index(n)
    all[i].number = v
    this.set(all)
  }

  private index = (n: number) => this.get().findIndex(({ number }) => number === n)
}
