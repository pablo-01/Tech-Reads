import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { ListsComponent } from './lists/lists.component';
import { ReadingHistoryComponent } from './reading-history/reading-history.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookProfileComponent } from './books/book-profile/book-profile.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInteceptor } from './_httpInterceptors/error.interceptor';
import { Err404Component } from './Errors/err404/err404.component';
import { ServerSideErrComponent } from './Errors/server-side-err/server-side-err.component';
import { BookCardComponent } from './books/book-card/book-card.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { UserCardComponent } from './users/user-card/user-card.component';
import { JwtInterceptor } from './_httpInterceptors/jwt.interceptor';
import { UserEditComponent } from './users/user-edit/user-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    UserListComponent,
    UserProfileComponent,
    ListsComponent,
    ReadingHistoryComponent,
    BookListComponent,
    BookProfileComponent,
    Err404Component,
    ServerSideErrComponent,
    BookCardComponent,
    UserCardComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TabsModule.forRoot()
  ],
  providers: [
    // providing wth error interceptior class, multi: true (to use multiple interceptors)
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInteceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
