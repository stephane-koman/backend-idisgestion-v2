import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {BASE_URL} from '../const/constants.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Client} from '../../models/client/client';
import {ListeClients} from '../../models/client/liste-clients';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) {
  }

  public getAllClients(): Observable<any> {
    return this.http.get<Array<Client>>(`${BASE_URL}/user/all-clients`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public getClientsByRaisonSociale(raisonSociale: string): Observable<any> {

    let httpParams = new HttpParams()
      .append('raisonSociale', raisonSociale);

    return this.http.get<Array<Client>>(`${BASE_URL}/user/clients-by-raisonsociale`, {params: httpParams})
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public getClientsByName(nom: string): Observable<any> {
    let httpParams = new HttpParams()
        .append('raisonSociale', nom);

    return this.http.get<Array<Client>>(`${BASE_URL}/user/get-clients`, {params: httpParams})
        .pipe(
            tap(
                (data) => {console.log(data)},
                error => console.log(error)
            ),
            catchError(this.handleErrorService.handleError)
        );
  }

  public searchClients(codeClient: string, raisonSociale: string, enable: number, page: number, size: number): Observable<any> {
    let httpParams = new HttpParams()
      .append('codeClient', codeClient)
      .append('raisonSociale', raisonSociale)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeClients>(`${BASE_URL}/user/search-clients`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addClient(client: Client) {

    return this.http.post<Client>(`${BASE_URL}/user/add-client`, client)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateClient(client: Client) {

    return this.http.post<Client>(`${BASE_URL}/user/update-client`, client)
      .pipe(
        tap(site => console.log(site) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getClient(codeClient: string) {
    let httpParams = new HttpParams()
      .append('codeClient', codeClient);
    return this.http.get<Client>(`${BASE_URL}/user/take-client`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disableClient(client: Client) {
    return this.http.post<Client>(`${BASE_URL}/user/disable-client`, client)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enableClient(client: Client) {
    return this.http.post<Client>(`${BASE_URL}/admin/enable-client`, client)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removeClient(client: Client) {
    return this.http.post<Client>(`${BASE_URL}/admin/remove-client`, client)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public countClients(): Observable<any> {
    return this.http.get<string>(`${BASE_URL}/user/count-clients`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }
}
