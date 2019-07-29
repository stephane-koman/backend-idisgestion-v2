import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenService} from '../services/token/token.service';
import { Location } from '@angular/common';

@Injectable()

export class RoleGuard implements CanActivate {

  protected roles: Array<any>;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private location: Location
  ){
    this.roles = this.tokenService.getRoles();
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let bool = this.tokenService.hasRoles(next.data.roles);

    if(bool && this.tokenService.isAuthenticated())
    {
      return true;
    }

    // navigate to not found page
    this.router.navigate(['/login']);
    //this.location.back();

    return false;
  }
}
