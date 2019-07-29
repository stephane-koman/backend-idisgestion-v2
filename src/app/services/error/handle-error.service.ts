import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from "@angular/router";

@Injectable()
export class HandleErrorService {

  constructor(
      private router: Router,
  ) { }

  /**
   *
   * @param {HttpErrorResponse} error
   * @returns {ErrorObservable}
   */
  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError(error.error.message);
  }

}
