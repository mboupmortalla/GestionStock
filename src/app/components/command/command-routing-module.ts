import { Routes } from '@angular/router';
import {command} from "./command";



export const CommandRoutingModule: Routes = [
{
  path: '',
  component:command,
  children:[
    {path: '',
      redirectTo: 'commands',
      pathMatch: 'full',
    }
  ]
}
]
