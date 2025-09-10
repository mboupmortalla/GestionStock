import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {command} from "../command/command";
import {stock} from "./stock";
import {AddStock} from "./add-stock/add-stock";



export const StockRoutingModule: Routes = [
  {
    path: '',
    component:stock,
    children:[
      {path: '',
        redirectTo: 'stocks',
        pathMatch: 'full',
      }
    ]
  },
  {
    path:'add-stock',
    component: AddStock
  }
]
