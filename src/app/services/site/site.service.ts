import { Injectable } from '@angular/core';
import {HandleErrorService} from '../error/handle-error.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BASE_URL} from '../const/constants.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Site} from '../../models/site/site';
import {ListeSites} from '../../models/site/liste-sites';

@Injectable()
export class SiteService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) {
  }

  public getAllSites(): Observable<any> {
    return this.http.get<Array<Site>>(`${BASE_URL}/user/all-sites`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public getAllSitesColis(): Observable<any> {
    return this.http.get<Array<Site>>(`${BASE_URL}/user/all-sites-colis`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public searchSites(nomSite: string, codeSite: string, nomPays: string, enable: number, page: number, size: number): Observable<any> {
    let httpParams = new HttpParams()
      .append('nomSite', nomSite)
      .append('codeSite', codeSite)
      .append('nomPays', nomPays)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeSites>(`${BASE_URL}/admin/search-sites`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addSite(site: Site) {

    return this.http.post<Site>(`${BASE_URL}/admin/add-site`, site)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateSite(site: Site) {

    return this.http.post<Site>(`${BASE_URL}/admin/update-site`, site)
      .pipe(
        tap(site => console.log(site) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getSite(id: number) {
    let httpParams = new HttpParams()
      .append('id', id.toString());
    return this.http.get<Site>(`${BASE_URL}/admin/take-site`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disableSite(site: Site) {
    return this.http.post<Site>(`${BASE_URL}/admin/disable-site`, site)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enableSite(site: Site) {
    return this.http.post<Site>(`${BASE_URL}/admin/enable-site`, site)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removeSite(site: Site) {
    return this.http.post<Site>(`${BASE_URL}/admin/remove-site`, site)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }
}
