import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListeUtilisateurs} from '../../models/utilisateur/liste-utilisateurs';
import {catchError, tap} from 'rxjs/operators';
import {BASE_URL} from '../const/constants.service';
import {HandleErrorService} from '../error/handle-error.service';
import {Utilisateur} from '../../models/utilisateur/utilisateur';
import {RegisterForm} from '../../models/utilisateur/register-form';

@Injectable()
export class UtilisateurService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {
  }

  public searchUsers(username: string, role: string, enable: number, page: number, size: number): Observable<any> {
    let httpParams = new HttpParams()
      .append('username', username)
      .append('roles', role)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeUtilisateurs>(`${BASE_URL}/admin/search-users?`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addUser(user: RegisterForm) {

    return this.http.post<Utilisateur>(`${BASE_URL}/admin/add-user`, user)
      .pipe(
      tap(user => console.log(user) ),
      catchError(this.handleErrorService.handleError)
    );

  }

  public updateUser(user: RegisterForm) {

    return this.http.post<Utilisateur>(`${BASE_URL}/admin/update-user`, user)
      .pipe(
        tap(user => console.log(user) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getUser(id: number) {
    let httpParams = new HttpParams()
      .append('id', id.toString());
    return this.http.get<Utilisateur>(`${BASE_URL}/admin/take-user`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public getProfile() {
    return this.http.get<Utilisateur>(`${BASE_URL}/profile/user`)
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disableUser(user: Utilisateur) {
    return this.http.post<Utilisateur>(`${BASE_URL}/admin/disable-user`, user)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enableUser(user: Utilisateur) {
    return this.http.post<Utilisateur>(`${BASE_URL}/admin/enable-user`, user)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removeUser(user: Utilisateur) {
    return this.http.post<Utilisateur>(`${BASE_URL}/admin/remove-user`, user)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }

}
