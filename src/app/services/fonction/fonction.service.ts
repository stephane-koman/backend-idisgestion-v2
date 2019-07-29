import { Injectable } from '@angular/core';
import {BASE_URL} from '../const/constants.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {Fonction} from '../../models/fonction/fonction';
import {ListeFonctions} from '../../models/fonction/liste-fonctions';

@Injectable()
export class FonctionService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) { }

  public getAllFonctions(): Observable<any> {
    return this.http.get<Array<Fonction>>(`${BASE_URL}/user/all-fonctions`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public searchFonction(nomFonction: string, enable: number, page: number, size: number): Observable<any> {
    let httpParams = new HttpParams()
      .append('nomFonction', nomFonction)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeFonctions>(`${BASE_URL}/user/search-fonctions`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addFonction(fonction: Fonction) {

    return this.http.post<Fonction>(`${BASE_URL}/user/add-fonction`, fonction)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateFonction(fonction: Fonction) {

    return this.http.post<Fonction>(`${BASE_URL}/user/update-fonction`, fonction)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getFonction(id: number) {
    let httpParams = new HttpParams()
      .append('id', id.toString());
    return this.http.get<Fonction>(`${BASE_URL}/user/take-fonction`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disableFonction(fonction: Fonction) {
    return this.http.post<Fonction>(`${BASE_URL}/user/disable-fonction`, fonction)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enableFonction(fonction: Fonction) {
    return this.http.post<Fonction>(`${BASE_URL}/admin/enable-fonction`, fonction)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removeFonction(fonction: Fonction) {
    return this.http.post<Fonction>(`${BASE_URL}/admin/remove-fonction`, fonction)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }

}
