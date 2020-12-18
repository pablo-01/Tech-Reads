import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  // inject accout service (need token access)
  constructor(private accService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let curUser: User;


    /// 
    //using 'take' allows to instruct that after we get from observable it completes
    //no need to unsubscribe;
    //
    ///
    this.accService.currentUser$.pipe(take(1)).subscribe(user => curUser = user);
    if (curUser) {
      request = request.clone({
        setHeaders: {
          // `` - concatonate; 
          // attaching token for every request (when loggin in) 
          // therfore no need to add the authorization to any request
          Authorization: `Bearer  ${curUser.token}`   
        }
      })
    }
    return next.handle(request);
  }
}
