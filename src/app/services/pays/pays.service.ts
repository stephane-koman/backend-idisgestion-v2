import { Injectable } from '@angular/core';
import {BASE_URL} from '../const/constants.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {Pays} from '../../models/pays/pays';
import {ListePays} from '../../models/pays/liste-pays';

@Injectable()
export class PaysService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) { }

  public getAllPays(): Observable<any> {
    return this.http.get<Array<Pays>>(`${BASE_URL}/user/all-pays`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public searchPays(nomPays: string, enable: number, page: number, size: number): Observable<any> {
    let httpParams = new HttpParams()
      .append('nomPays', nomPays)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListePays>(`${BASE_URL}/user/search-pays`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addPays(pays: Pays) {

    return this.http.post<Pays>(`${BASE_URL}/user/add-pays`, pays)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updatePays(pays: Pays) {

    return this.http.post<Pays>(`${BASE_URL}/user/update-pays`, pays)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getPays(id: number) {
    let httpParams = new HttpParams()
      .append('id', id.toString());
    return this.http.get<Pays>(`${BASE_URL}/user/take-pays`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disablePays(pays: Pays) {
    return this.http.post<Pays>(`${BASE_URL}/user/disable-pays`, pays)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enablePays(pays: Pays) {
    return this.http.post<Pays>(`${BASE_URL}/admin/enable-pays`, pays)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removePays(pays: Pays) {
    return this.http.post<Pays>(`${BASE_URL}/admin/remove-pays`, pays)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }

}
