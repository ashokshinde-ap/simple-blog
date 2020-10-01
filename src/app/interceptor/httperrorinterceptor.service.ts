import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(0),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.status === 401) {
          if (window.location.href.includes('login')) {
            if (error && error.error && error.error.message)
              this.toastr.error(error.error.message);
          } else {
            this.toastr.error(error.error.message);
            this.router.navigateByUrl('login');
          }
        } else if (error.status === 500) {
          this.toastr.error(error.error.message);
        } else if (error.status === 422) {
          this.toastr.error(error.error.message);
        } else if (error.status === 409) {
          this.toastr.error(error.error.message);
        } else if (error.status === 404) {
          this.toastr.error(error.error.message);
        } else if (error.status === 400) {
          this.toastr.error(error.error.message);
        } else {
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }

        return throwError(errorMessage);
      })
    );
  }
}
