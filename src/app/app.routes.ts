import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import {authentication} from "./pages/authentication/authentication.guard";

export const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () =>
      import('./pages/authentication/authentication.routes').then(
        (m) => m.AuthenticationRoutes
      ),
  },
  {
    path: '',
    component: FullComponent,
    canActivate:[authentication],
    children: [
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'products',
        loadChildren:()=> import('./components/products/products-routing-module').then((m)=> m.ProductsRoutingModule)
      },{
        path: 'providers',
        loadChildren:()=> import('./components/providers/providers-routing-module').then((m)=> m.ProvidersRoutingModule)
      },{
        path: 'categories',
        loadChildren:()=> import('./components/categories/categories-routing-module').then((m)=> m.CategoriesRoutingModule)
      },{
        path: 'clients',
        loadChildren:()=> import('./components/clients/clients-routing-module').then((m)=> m.ClientsRoutingModule)
      },{
        path: 'commands',
        loadChildren:()=> import('./components/command/command-routing-module').then((m)=> m.CommandRoutingModule)
      },{
        path: 'stocks',
        loadChildren:()=> import('./components/stock/stock-routing-module').then((m)=> m.StockRoutingModule)
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
