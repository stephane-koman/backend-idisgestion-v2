import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {BASE_URL} from '../const/constants.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Employe} from '../../models/employe/employe';
import {ListeEmployes} from '../../models/employe/liste-employes';
import {Subject} from 'rxjs';

@Injectable()
export class EmployeService {

  employesSubject = new Subject<any>();
  employesSubject$ = this.employesSubject.asObservable();
  listeEmployes: ListeEmployes;

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) {
  }

  emitEmploye(){
    this.employesSubject.next(this.listeEmployes);
  }

  public getAllEmployes(): Observable<any> {
    return this.http.get<Array<Employe>>(`${BASE_URL}/user/all-employes`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public searchEmployes(matricule: string, nomSite: string, raisonSociale: string, enable: number, page: number, size: number): Observable<any> {
    let httpParams = new HttpParams()
      .append('matricule', matricule)
      .append('nomSite', nomSite)
      .append('raisonSociale', raisonSociale)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeEmployes>(`${BASE_URL}/user/search-employes`, {params: httpParams})
      .pipe(
        tap(
          data => {
            console.log(data)
            this.listeEmployes = data;
            this.emitEmploye();
          },
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addEmploye(employe: Employe) {

    return this.http.post<Employe>(`${BASE_URL}/user/add-employe`, employe)
      .pipe(
        tap(data => {
          console.log(data)
        } ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateEmploye(employe: Employe) {

    return this.http.post<Employe>(`${BASE_URL}/user/update-employe`, employe)
      .pipe(
        tap(site => console.log(site) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getEmploye(matricule: string) {
    let httpParams = new HttpParams()
      .append('matricule', matricule);
    return this.http.get<Employe>(`${BASE_URL}/user/take-employe`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disableEmploye(employe: Employe) {
    return this.http.post<Employe>(`${BASE_URL}/user/disable-employe`, employe)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enableEmploye(employe: Employe) {
    return this.http.post<Employe>(`${BASE_URL}/admin/enable-employe`, employe)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removeEmploye(employe: Employe) {
    return this.http.post<Employe>(`${BASE_URL}/admin/remove-employe`, employe)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public countEmployes(): Observable<any> {
    return this.http.get<string>(`${BASE_URL}/user/count-employes`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }
}
