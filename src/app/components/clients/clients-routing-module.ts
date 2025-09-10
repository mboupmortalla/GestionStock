import { Routes } from '@angular/router';
import {Clients} from "./clients";



export const ClientsRoutingModule: Routes = [
  {
    path: '',
    component:Clients,
    children:[
      {path: '',
        redirectTo: 'clients',
        pathMatch: 'full',
      }
    ]
  }
]
