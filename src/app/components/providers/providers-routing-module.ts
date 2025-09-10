import { Routes } from '@angular/router';
import {Providers} from "./providers";


export const ProvidersRoutingModule: Routes = [
  {
    path: '',
    component:Providers,
    children:[
      {path: '',
        redirectTo: 'providers',
        pathMatch: 'full',
      }
    ]
  }
]
