import {Injectable} from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {TokenService} from '../services/token/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.tokenService.getAsyncToken();

    // Clone the request and set the new header in one step.
    const authReq = req.clone({setHeaders: {Authorization: authToken}});

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
