import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { RootModule } from './app/module'


platformBrowserDynamic().bootstrapModule(RootModule)
  .catch(err => console.error(err))
