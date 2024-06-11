import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ` + token,
          },
          // headers: new HttpHeaders({

          //   'Content-Type': 'application/json',
          //   'Access-Control-Allow-Origin': '*',
          // }),
        });
      }
    }
    return next.handle(req);
  }
}
