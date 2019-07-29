import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {tap, catchError} from 'rxjs/operators';
import {BASE_URL} from '../const/constants.service';
import {TokenService} from '../token/token.service';
import {Utilisateur} from '../../models/utilisateur/utilisateur';
import {Router} from '@angular/router';
import {HandleErrorService} from '../error/handle-error.service';

@Injectable()
export class AuthenticationService {

  private jwtTokenName = 'jwt_token';
  user = new Utilisateur();
  constructor(
    public http: HttpClient,
    private jwtHelper: JwtHelperService,
    private tokenService: TokenService,
    private router: Router,
    private handleErrorService: HandleErrorService
  ) {
  }

  /**
   *
   * @param username
   * @param password
   * @returns {Observable<any>}
   */
  login(username, password) {
    this.user.username = username;
    this.user.password = password;

    this.tokenService.removeToken(this.jwtTokenName);

    return this.http.post(`${BASE_URL}/login`, this.user, {observe: 'response'})
      .pipe(
        tap(
          jwt => this.tokenService.saveToken(jwt.headers.get('Authorization')),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public logout(){
    setTimeout(() =>{
      this.tokenService.removeToken(this.jwtTokenName);
      this.router.navigate(['login']);
    }, 1000);
  }
}
