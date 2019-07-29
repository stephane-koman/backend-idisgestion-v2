import { Injectable } from '@angular/core';
import {BASE_URL} from '../const/constants.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {TypeFacture} from '../../models/type-facture/type-facture';
import {ListeTypeFacture} from '../../models/type-facture/liste-type-facture';

@Injectable()
export class TypeFactureService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) { }

  public getAllTypeFacture(): Observable<any> {
    return this.http.get<Array<TypeFacture>>(`${BASE_URL}/user/all-types-facture`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public searchTypeFacture(nomTypeFacture: string, enable: number, page: number, size: number): Observable<any> {
    let httpParams = new HttpParams()
      .append('nomTypeFacture', nomTypeFacture)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeTypeFacture>(`${BASE_URL}/user/search-types-facture`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addTypeFacture(typeFacture: TypeFacture) {

    return this.http.post<TypeFacture>(`${BASE_URL}/user/add-type-facture`, typeFacture)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateTypeFacture(typeFacture: TypeFacture) {

    return this.http.post<TypeFacture>(`${BASE_URL}/user/update-type-facture`, typeFacture)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getTypeFacture(id: number) {
    let httpParams = new HttpParams()
      .append('id', id.toString());
    return this.http.get<TypeFacture>(`${BASE_URL}/user/take-type-facture`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disableTypeFacture(typeFacture: TypeFacture) {
    return this.http.post<TypeFacture>(`${BASE_URL}/user/disable-type-facture`, typeFacture)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enableTypeFacture(typeFacture: TypeFacture) {
    return this.http.post<TypeFacture>(`${BASE_URL}/admin/enable-type-facture`, typeFacture)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removeTypeFacture(typeFacture: TypeFacture) {
    return this.http.post<TypeFacture>(`${BASE_URL}/admin/remove-type-facture`, typeFacture)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }

}
