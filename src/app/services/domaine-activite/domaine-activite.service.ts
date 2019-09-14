import { Injectable } from '@angular/core';
import {BASE_URL} from '../const/constants.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {DomaineActivite} from '../../models/domaine-activite/domaine-activite';
import {ListeDomaineActivite} from '../../models/domaine-activite/liste-domaine-activite';
import {Colis} from '../../models/colis/colis';

@Injectable()
export class DomaineActiviteService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) { }

  public getAllDomaineActivite(): Observable<any> {
    return this.http.get<Array<DomaineActivite>>(`${BASE_URL}/user/all-domaine-activite`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public searchDomaineActivite(code: string, enable: number, page: number, size: number): Observable<any> {
    let httpParams = new HttpParams()
      .append('code', code)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeDomaineActivite>(`${BASE_URL}/user/search-domaine-activite`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public getDomainesActiviteByCode(code: string): Observable<any> {
    let httpParams = new HttpParams()
      .append('code', code);
    return this.http.get<Array<DomaineActivite>>(`${BASE_URL}/user/domaine-activite-by-code`, {params: httpParams})
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addDomaineActivite(domaineActivite: DomaineActivite) {

    return this.http.post<DomaineActivite>(`${BASE_URL}/user/add-domaine-activite`, domaineActivite)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateDomaineActivite(domaineActivite: DomaineActivite) {

    return this.http.post<DomaineActivite>(`${BASE_URL}/user/update-domaine-activite`, domaineActivite)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getDomaineActivite(id: number) {
    let httpParams = new HttpParams()
      .append('id', id.toString());
    return this.http.get<DomaineActivite>(`${BASE_URL}/user/take-domaine-activite`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disableDomaineActivite(domaineActivite: DomaineActivite) {
    return this.http.post<DomaineActivite>(`${BASE_URL}/user/disable-domaine-activite`, domaineActivite)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enableDomaineActivite(domaineActivite: DomaineActivite) {
    return this.http.post<DomaineActivite>(`${BASE_URL}/admin/enable-domaine-activite`, domaineActivite)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removeDomaineActivite(domaineActivite: DomaineActivite) {
    return this.http.post<DomaineActivite>(`${BASE_URL}/admin/remove-domaine-activite`, domaineActivite)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }

}
