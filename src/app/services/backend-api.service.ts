import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  constructor(private httpClient: HttpClient) {}

  getHeroes(): Observable<object> {
    return this.httpClient.get('/api/v1/people');
  }

  logSomething(): boolean {
    console.log('mock logger');
    return true;
  }
}
