import { Injectable } from '@angular/core';
import {BASE_URL} from '../const/constants.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {TypeReglement} from '../../models/type-reglement/type-reglement';
import {ListeTypeReglement} from '../../models/type-reglement/liste-type-reglement';

@Injectable()
export class TypeReglementService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) { }

  public getAllTypeReglement(): Observable<any> {
    return this.http.get<Array<TypeReglement>>(`${BASE_URL}/user/all-types-reglement`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public searchTypeReglement(nomTypeReglement: string, enable: number, page: number, size: number): Observable<any> {
    let httpParams = new HttpParams()
      .append('nomTypeReglement', nomTypeReglement)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeTypeReglement>(`${BASE_URL}/user/search-types-reglement`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addTypeReglement(typeReglement: TypeReglement) {

    return this.http.post<TypeReglement>(`${BASE_URL}/user/add-type-reglement`, typeReglement)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateTypeReglement(typeReglement: TypeReglement) {

    return this.http.post<TypeReglement>(`${BASE_URL}/user/update-type-reglement`, typeReglement)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getTypeReglement(id: number) {
    let httpParams = new HttpParams()
      .append('id', id.toString());
    return this.http.get<TypeReglement>(`${BASE_URL}/user/take-type-reglement`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disableTypeReglement(typeReglement: TypeReglement) {
    return this.http.post<TypeReglement>(`${BASE_URL}/user/disable-type-reglement`, typeReglement)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enableTypeReglement(typeReglement: TypeReglement) {
    return this.http.post<TypeReglement>(`${BASE_URL}/admin/enable-type-reglement`, typeReglement)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removeTypeReglement(typeReglement: TypeReglement) {
    return this.http.post<TypeReglement>(`${BASE_URL}/admin/remove-type-reglement`, typeReglement)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }

}
