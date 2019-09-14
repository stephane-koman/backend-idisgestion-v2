import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';


import {Observable} from 'rxjs/Observable';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let clonedReq: any = req;

    if (req.method == 'POST' || req.method == 'PATCH' || req.method == 'PUT') {

      if(req.url.indexOf('-files') === -1){
        clonedReq = req.clone({setHeaders: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }});
      }

      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}
