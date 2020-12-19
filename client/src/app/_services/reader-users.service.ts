import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { readerUser } from '../_models/readerUser';

@Injectable({
  providedIn: 'root'
})
export class ReaderUsersService {
  baseUrl = environment.apiUrl;

  // inject http client
  constructor(private http: HttpClient) { }


  // get users from api
  getUsers() {
    return this.http.get<readerUser[]>(this.baseUrl + 'users');
  }

  // // get one user by id from api
  // getUser(id: string) {
  //   return this.http.get<readerUser>(this.baseUrl + 'users/' + id);
  // }

  // get readerUser by username  TODO - WATCH for conflict
  getUser(username: string) {
    return this.http.get<readerUser>(this.baseUrl + 'users/' + username);
  }

  // user update method; passing in readerUser
  updateUser(user: readerUser) {
    console.log("user object in updateUser() in reader-user service is: ")
    console.log(user);
    return this.http.put(this.baseUrl + 'users/', user);
  }

}
