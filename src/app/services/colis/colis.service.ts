import { Injectable } from '@angular/core';
import {HttpClient, HttpBackend, HttpHeaders, HttpParams} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {BASE_URL} from '../const/constants.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Colis} from '../../models/colis/colis';
import {ListeColis} from '../../models/colis/liste-colis';
import {Utilisateur} from '../../models/utilisateur/utilisateur';

@Injectable()
export class ColisService {

  private httpClient: HttpClient;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    handler: HttpBackend
  ) {
    this.httpClient = new HttpClient(handler);
  }

  public getAllSendColis(): Observable<any> {
    return this.http.get<Array<Colis>>(`${BASE_URL}/user/send/all-colis`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public getSendColisByReference(reference: string): Observable<any> {
    let httpParams = new HttpParams()
      .append('reference', reference);
    return this.http.get<Array<Colis>>(`${BASE_URL}/user/send/colis-by-reference`, {params: httpParams})
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public sendSearchColis(reference: string, nomClient: string, nomDestinataire: string, enable: number, page: number, size: number): Observable<any> {
    let httpParams = new HttpParams()
      .append('reference', reference)
      .append('nomClient', nomClient)
      .append('nomDestinataire', nomDestinataire)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeColis>(`${BASE_URL}/user/send/search-colis`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public receiveSearchColis(reference: string, nomClient: string, nomDestinataire: string, enable: number, page: number, size: number): Observable<any> {
    let httpParams = new HttpParams()
      .append('reference', reference)
      .append('nomClient', nomClient)
      .append('nomDestinataire', nomDestinataire)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeColis>(`${BASE_URL}/user/receive/search-colis`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public clientSearchColis(reference: string, nomDestinataire: string, page: number, size: number): Observable<ListeColis> {
    let httpParams = new HttpParams()
      .append('reference', reference)
      .append('nomDestinataire', nomDestinataire)
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<any>(`${BASE_URL}/client/search-colis`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addColis(formData: any) {

    return this.http.post<Colis>(`${BASE_URL}/user/add-colis-files`, formData)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateColis(formData: any) {

    return this.http.post<Colis>(`${BASE_URL}/user/update-colis-files`, formData)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getColis(reference: string) {
    let httpParams = new HttpParams()
      .append('reference', reference);
    return this.http.get<Utilisateur>(`${BASE_URL}/user/take-colis`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disableColis(colis: Colis) {
    return this.http.post<Colis>(`${BASE_URL}/user/disable-colis`, colis)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enableColis(colis: Colis) {
    return this.http.post<Colis>(`${BASE_URL}/admin/enable-colis`, colis)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removeColis(colis: Colis) {
    return this.http.post<Colis>(`${BASE_URL}/admin/remove-colis`, colis)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  //-------------------------------- START SUIVI COLIS ----------------------------------------

  public addEnregistrementColis(colis: Colis) {

    return this.http.post<Colis>(`${BASE_URL}/user/add-enregistrement-colis`, colis)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateEnregistrementColis(colis: Colis) {

    return this.http.post<Colis>(`${BASE_URL}/user/update-enregistrement-colis`, colis)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public addExpeditionColis(colis: Colis) {

    return this.http.post<Colis>(`${BASE_URL}/user/add-expedition-colis`, colis)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateExpeditionColis(colis: Colis) {

    return this.http.post<Colis>(`${BASE_URL}/user/update-expedition-colis`, colis)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public addArriveeColis(colis: Colis) {

    return this.http.post<Colis>(`${BASE_URL}/user/add-arrivee-colis`, colis)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateArriveeColis(colis: Colis) {

    return this.http.post<Colis>(`${BASE_URL}/user/update-arrivee-colis`, colis)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public addReceptionColis(colis: Colis) {

    return this.http.post<Colis>(`${BASE_URL}/user/add-reception-colis`, colis)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateReceptionColis(colis: Colis) {

    return this.http.post<Colis>(`${BASE_URL}/user/update-reception-colis`, colis)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public addLivraisonColis(colis: Colis) {

    return this.http.post<Colis>(`${BASE_URL}/user/add-livraison-colis`, colis)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateLivraisonColis(colis: Colis) {

    return this.http.post<Colis>(`${BASE_URL}/user/update-livraison-colis`, colis)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  //-------------------------------- END SUIVI COLIS ----------------------------------------

  // ------------------------------- DASHBOARD ----------------------------
  public countSendColis(){
    return this.http.get(`${BASE_URL}/user/count-send-colis`, {responseType: 'text'})
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public countReceiveColis() {
    return this.http.get(`${BASE_URL}/user/count-receive-colis`, {responseType: 'text'})
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public countClientColis() {
    return this.http.get(`${BASE_URL}/user/count-client-colis`, {responseType: 'text'})
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public getQrCodePDF(referenceColis: string) {
    let httpParams = new HttpParams()
        .append('referenceColis', referenceColis);
    return this.http.get(`${BASE_URL}/user/qrcode-pdf`, {params: httpParams, responseType: 'arraybuffer'})
        .pipe(
            tap(
                data => console.log(data),
                error => console.log(error)
            ),
            catchError(this.handleErrorService.handleError)
        );
  }
}
