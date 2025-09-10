import {Routes } from '@angular/router';
import {Products} from "./products";

export const ProductsRoutingModule: Routes = [
  {
    path: '',
    component:Products,
    children:[
      {path: '',
      redirectTo: 'products',
      pathMatch: 'full',
      }
    ]
  }
]
