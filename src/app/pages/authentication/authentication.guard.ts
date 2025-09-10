import {
  CanActivate,
  Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class authentication implements CanActivate {
  private isLoggedIn: boolean;
  constructor(private router: Router) {
  this.isLoggedIn =Boolean(localStorage.getItem("isLoggedIn"));

  }

  canActivate(): boolean {
    if(this.isLoggedIn) {
      return true;
    }else{

    }
    this.router.navigate(['/authentication/login']);
    return false;
  }
}
