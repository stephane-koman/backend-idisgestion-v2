import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenService} from '../services/token/token.service';
import { Location } from '@angular/common';

@Injectable()

export class HomeGuard implements CanActivate {

  protected roles: Array<any>;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private location: Location
  ){
    this.roles = this.tokenService.getRoles();
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if(!this.tokenService.isAuthenticated())
    {
      return true;
    }

    // navigate to not found page
    this.router.navigate(['/dashboard']);
    //this.location.back();

    return false;
  }
}
