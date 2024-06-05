import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.models';
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = 'http://localhost:5013/api/books';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  create(book: Book): Observable<any> {
    return this.http.post(this.apiUrl, book);
  }
  getBookById(BookId: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + BookId);
  }

  updateBook(bookId: number, book: Book): Observable<any> {
    return this.http.put(
      this.apiUrl + '/' + bookId,
      book
    );
  }
  deletebook(bookId: number) {
    return this.http.delete(this.apiUrl + '/' + bookId);
  }
}
