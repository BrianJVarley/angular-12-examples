import { not } from '@angular/compiler/src/output/output_ast';
import { TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { BackendApiService } from '../services/backend-api.service';

import { HttpConfigInterceptor } from './httpconfig.interceptor';

describe('HttpconfigInterceptor', () => {
  let mockBackendServiceSpy: any;
  mockBackendServiceSpy = jasmine.createSpyObj(['logSomething']);

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        HttpConfigInterceptor,
        { provide: BackendApiService, useValue: mockBackendServiceSpy },
      ],
    })
  );

  it('should be created', () => {
    const interceptor: HttpConfigInterceptor = TestBed.inject(
      HttpConfigInterceptor
    );
    expect(interceptor).toBeTruthy();
  });

  it('should call logSomething if 401 response returned from api', () => {
    const interceptor: HttpConfigInterceptor = TestBed.inject(
      HttpConfigInterceptor
    );

    //arrange
    const httpRequestSpy = jasmine.createSpyObj('HttpRequest', [
      'doesNotMatter',
    ]);
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(
      throwError({ error: { message: 'test-error', status: 401 } })
    );
    //act
    interceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
      (result) => console.log('good', result),
      (err) => {
        console.log('error', err);
        expect(err.error.message).toEqual('test-error');
        expect(mockBackendServiceSpy.logSomething).toHaveBeenCalled();
      }
    );

  });
});
