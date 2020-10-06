import { AuthService } from './../auth/auth.service';
import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpinterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService);
    let tokenedreq = authService.getToken()
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        })
      : req;
    return next.handle(tokenedreq);
  }
}
