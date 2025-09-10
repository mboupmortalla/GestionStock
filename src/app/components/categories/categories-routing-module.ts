import { Routes } from '@angular/router';
import {Categories} from "./categories";



export const CategoriesRoutingModule: Routes = [
  {
    path: '',
    component:Categories,
    children:[
      {path: '',
        redirectTo: 'categories',
        pathMatch: 'full',
      }
    ]
  }
]
