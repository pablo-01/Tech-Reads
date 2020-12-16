import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookProfileComponent } from './books/book-profile/book-profile.component';
import { Err404Component } from './Errors/err404/err404.component';
import { ServerSideErrComponent } from './Errors/server-side-err/server-side-err.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AuthGuard } from './_guards/auth.guard';

// specify routes 
const routes: Routes = [
  {path: '', component: HomeComponent}, // top level

  
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'users', component: UserListComponent},
      {path: 'books', component: BookListComponent}, // for book listing
      {path: 'books:/id', component: BookProfileComponent}, // for book profile
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
