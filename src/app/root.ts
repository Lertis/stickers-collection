import { Component } from '@angular/core'
import { env } from './env/dev'

@Component({
  selector: 'stk-root',
  templateUrl: './root.html',
  styleUrls: ['./root.scss']
})
export class RootComponent {
  constructor () {
    console.log(env.production)
  }
}
