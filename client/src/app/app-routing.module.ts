import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookProfileComponent } from './books/book-profile/book-profile.component';
import { Err404Component } from './Errors/err404/err404.component';
import { ServerSideErrComponent } from './Errors/server-side-err/server-side-err.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { UserCardComponent } from './users/user-card/user-card.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { EnsureUpdatesGuard } from './_guards/ensure-updates.guard';

// specify routes 
const routes: Routes = [
  {path: '', component: HomeComponent}, // top level

  
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'users', component: UserListComponent}, // for user listing
      {path: 'users/:id', component: UserProfileComponent}, // for user profile

      // for user profile edit, using ensure updates guard
      {path: 'user/edit', component: UserEditComponent, canDeactivate: [EnsureUpdatesGuard]},
      {path: 'books', component: BookListComponent}, // for book listing
      {path: 'books/:_id', component: BookProfileComponent}, // for book profile
      {path: 'lists', component: ListsComponent}, // for lists, bookmarks 

    ]
  },
  {path: 'err404', component: Err404Component},
  {path: 'server-side-err', component: ServerSideErrComponent},
  {path: '**', component: Err404Component, pathMatch: 'full'} // wildcard root - if does not exist, refirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
