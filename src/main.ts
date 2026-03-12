import { bootstrapApplication } from '@angular/platform-browser';
import { RootComponent } from './app/root'
import { appConfig } from './config'

bootstrapApplication(RootComponent, appConfig)
  .catch((err) => console.error(err));
