import { Injectable } from '@angular/core'
import { CollectionItem } from '../model'

@Injectable({ providedIn: 'root' })
export class CollectionStorageService {
  private _k: string

  set key (v: string) {
    this._k = v
  }

  get key (): string {
    return this._k
  }

  get (): CollectionItem[] {
    return JSON.parse(localStorage.getItem(this.key))
  }

  set (collection: CollectionItem[]): void {
    localStorage.setItem(this.key, JSON.stringify(collection))
  }

  change = ({ number, has }: { number: number, has: boolean }) => {
    const all = this.get()
    const i = this.index(number)
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
