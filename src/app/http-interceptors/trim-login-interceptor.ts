import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TrimLoginInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const body = req.body;
    if (!body || !body.username || !body.password ) {
      return next.handle(req);
    }
    // copy the body and trim whitespace from the name property
    const newBody = { ...body, username: body.username.trim(), password: body.password.trim() };
    // clone request and set its body
    const newReq = req.clone({ body: newBody });
    // send the cloned request to the next handler.
    return next.handle(newReq);
  }
}
