import { Injectable } from '@angular/core';
import {BASE_URL} from '../const/constants.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {Devise} from '../../models/devise/devise';
import {ListeDevise} from '../../models/devise/liste-devise';

@Injectable()
export class DeviseService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) { }

  public getAllDevises(): Observable<any> {
    return this.http.get<Array<Devise>>(`${BASE_URL}/user/all-devises`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public searchDevises(nomDevise: string, enable: number, page: number, size: number): Observable<any> {
    let httpParams = new HttpParams()
      .append('nomDevise', nomDevise)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeDevise>(`${BASE_URL}/user/search-devises`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addDevise(devise: Devise) {

    return this.http.post<Devise>(`${BASE_URL}/user/add-devise`, devise)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateDevise(devise: Devise) {

    return this.http.post<Devise>(`${BASE_URL}/user/update-devise`, devise)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getDevise(id: number) {
    let httpParams = new HttpParams()
      .append('id', id.toString());
    return this.http.get<Devise>(`${BASE_URL}/user/take-devise`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disableDevise(devise: Devise) {
    return this.http.post<Devise>(`${BASE_URL}/user/disable-devise`, devise)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enableDevise(devise: Devise) {
    return this.http.post<Devise>(`${BASE_URL}/admin/enable-devise`, devise)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removeDevise(devise: Devise) {
    return this.http.post<Devise>(`${BASE_URL}/admin/remove-devise`, devise)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }

}
