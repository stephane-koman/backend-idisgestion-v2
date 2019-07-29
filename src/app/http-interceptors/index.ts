/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TrimLoginInterceptor } from './trim-login-interceptor';
import {RequestInterceptor} from './request-interceptor';
import {TokenInterceptor} from './token-interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TrimLoginInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
];
