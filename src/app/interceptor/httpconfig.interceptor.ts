import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { BackendApiService } from '../services/backend-api.service';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private backendApiService: BackendApiService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(2),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason:
            error?.error && error?.error?.reason ? error.error.reason : '',
          status: error.status,
        };
        this.backendApiService.logSomething();
        console.log(data);
        return throwError(error);
      })
    );
  }
}
