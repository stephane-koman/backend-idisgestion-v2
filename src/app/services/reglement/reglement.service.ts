import { Injectable } from '@angular/core';
import {BASE_URL} from '../const/constants.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {Reglement} from '../../models/reglement/reglement';
import {ListeReglements} from '../../models/reglement/liste-reglements';
import {Mouvement} from '../../models/mouvement/mouvement';

@Injectable()
export class ReglementService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) { }

  public getAllReglements(): Observable<any> {
    return this.http.get<Array<Reglement>>(`${BASE_URL}/user/all-reglements`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public searchReglements(numeroFacture: string, nomTypeReglement: string, enable: number, page: number, size: number): Observable<any>{
    let httpParams = new HttpParams()
      .append('numeroFacture', numeroFacture)
      .append('nomTypeReglement', nomTypeReglement)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeReglements>(`${BASE_URL}/user/search-reglements`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addReglement(reglement: Reglement) {

    return this.http.post<Reglement>(`${BASE_URL}/user/add-reglement`, reglement)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateReglement(reglement: Reglement) {

    return this.http.post<Reglement>(`${BASE_URL}/user/update-reglement`, reglement)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getReglement(id: number) {
    let httpParams = new HttpParams()
      .append('id', id.toString());
    return this.http.get<Reglement>(`${BASE_URL}/user/take-reglement`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public getReglementPDF(numeroReglement: string) {
    let httpParams = new HttpParams()
      .append('numeroReglement', numeroReglement);
    return this.http.get(`${BASE_URL}/user/reglement-pdf`, {params: httpParams, responseType: 'arraybuffer'})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disableReglement(mouvement: Mouvement) {
    return this.http.post<Reglement>(`${BASE_URL}/user/disable-reglement`, mouvement)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enableReglement(mouvement: Mouvement) {
    return this.http.post<Reglement>(`${BASE_URL}/admin/enable-reglement`, mouvement)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removeReglement(mouvement: Mouvement) {
    return this.http.post<Reglement>(`${BASE_URL}/admin/remove-reglement`, mouvement)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }

}
