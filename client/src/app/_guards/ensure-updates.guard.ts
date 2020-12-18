import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserEditComponent } from '../users/user-edit/user-edit.component';

@Injectable({
  providedIn: 'root'
})
export class EnsureUpdatesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    // access component, return true or false
    component: UserEditComponent): boolean {
      if (component.formEdit.dirty) {
        return confirm('You made changes, discard?');
      }
      // if yes, deactivate, otherwise stay on form
    return true;
  }
  
}
