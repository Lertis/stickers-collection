import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  standalone: true,
  selector: 'stk-root',
  templateUrl: './root.html',
  styleUrls: ['./root.scss'],
  imports: [RouterOutlet]
})
export class RootComponent { }
