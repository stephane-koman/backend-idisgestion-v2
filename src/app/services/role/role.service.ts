import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {BASE_URL} from '../const/constants.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Role} from '../../models/role/role';
import {ListeRoles} from '../../models/role/liste-roles';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) {
  }

  public getAllRoles(): Observable<any> {
    return this.http.get<Array<Role>>(`${BASE_URL}/admin/all-roles`)
      .pipe(
        tap(
          (roles) => {console.log(roles)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public searchRoles(roleName: string, enable: number, page: number, size: number): Observable<ListeRoles> {
    let httpParams = new HttpParams()
      .append('roleName', roleName)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeRoles>(`${BASE_URL}/admin/search-roles`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addRole(role: Role) {

    return this.http.post<Role>(`${BASE_URL}/admin/add-role`, role)
      .pipe(
        tap(role => console.log(role) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateRole(role: Role) {

    return this.http.post<Role>(`${BASE_URL}/admin/update-role`, role)
      .pipe(
        tap(role => console.log(role) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getRole(id: number) {
    let httpParams = new HttpParams()
      .append('id', id.toString());
    return this.http.get<Role>(`${BASE_URL}/admin/take-role`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disableRole(role: Role) {
    return this.http.post<Role>(`${BASE_URL}/admin/disable-role`, role)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enableRole(role: Role) {
    return this.http.post<Role>(`${BASE_URL}/admin/enable-role`, role)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removeRole(role: Role) {
    return this.http.post<Role>(`${BASE_URL}/admin/remove-role`, role)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }
}
