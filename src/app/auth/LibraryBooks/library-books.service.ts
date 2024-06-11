import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryBooksService {
  private apiUrl = 'http://localhost:5013/api/libraries';

  constructor(private http: HttpClient) {}

  CreateLibraryBooks(library: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, library);
  }
}
