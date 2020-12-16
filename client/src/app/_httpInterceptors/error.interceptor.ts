import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInteceptor implements HttpInterceptor {

  ///
  // Error interceptor, provide in app.modules TODO
  // angular comes with in build interceptor
  // we can add to interceptor array
  ///

  // dependenct injection
  constructor(private router: Router, private toastr: ToastrService) {}

  // itercept can be mage on request and/or response (next)
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        // check for error
        if (error) {
          switch (error.status) {
            // flatten array of errirs that come from validation response
            // and push to array
            // bad request handling
            case 400:
              if (error.error.errors) {
                const stateError = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    stateError.push(error.error.errors[key])
                  }
                }
                // throw to component (in order to display)
                throw stateError.flat();  // using js flat() if there are array of arrays; from es2019
              }
              else {
                this.toastr.error(error.statusText, error.status);
              }
              break;
            // unauthorized 
            case 401:
              this.toastr.error(error.statusText, error.status);
              break;
            // in case of not found, using router to redirect to not found page 
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            // internal server error
            // redirect; and get error details
            // using router state feature
            // passing in: url, NavigationStateOptions
            case 500:
              const navExtras: NavigationExtras = {state: {error: error.error}};
              this.router.navigateByUrl('/server-error', navExtras);
              break;
            // For any other possible errors, use=ing default case
            // with generic message  
            default:
              this.toastr.error('An error has occured :(');
              
          }
        }
        return throwError(error);
      })
    )
  }
}
