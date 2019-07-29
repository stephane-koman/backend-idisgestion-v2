import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class TokenService {

  public jwtToken: string;

  private jwtTokenName = 'jwt_token';

  protected roles: Array<any>;

  constructor(
    public jwtHelper: JwtHelperService
  ) { }

  getAsyncToken(){
    let token = localStorage.getItem(this.jwtTokenName);
    return token ? token : "";
  }

  getRoles(){
    let token = localStorage.getItem(this.jwtTokenName);
    return token ? this.jwtHelper.decodeToken(token).roles : [];
  }

  loadToken() {
    this.jwtToken = localStorage.getItem(this.jwtTokenName);
    if(this.jwtToken){
      this.roles = this.jwtHelper.decodeToken(this.jwtToken).roles;
    }
  }

  saveToken(jwtToken: any){
    localStorage.setItem(this.jwtTokenName, jwtToken);
  }

  removeToken(jwtToken: any){
    localStorage.removeItem(this.jwtTokenName);
  }

  hasRole(role: String){
    let roles = this.getRoles();
    if(roles){
      for(let r of roles){
        if (r.authority == role) return true;
      }
    }
    return false;
  }

  hasRoles(rs: Array<String>){
    let roles = this.getRoles();
    if(roles){
      for(let r of roles){
        if (rs.includes(r.authority)) return true;
      }
    }
    return false;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(this.jwtTokenName);
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }


}
