import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../_models/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl = environment.apiUrl;

  // injest http client
  constructor(private http: HttpClient) { }


  // get books methos; adding Book type ensures type safety
  getBooks() {
    return this.http.get<Book[]>(this.baseUrl + 'books');
  }


  getBook(id: string) {
    return this.http.get<Book>(this.baseUrl + 'books/' + id);
  }

}


