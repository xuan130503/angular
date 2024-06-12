import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryDto } from '../../models/library-dto.models';
import { Book } from '../../models/book.models';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private apiurlLib = 'http://localhost:5013/api/libraries';

  constructor(private http: HttpClient) {}

  getAllLibrary(): Observable<any> {
  
    return this.http.get(this.apiurlLib);
  }

  getLibraryById(libraryId: number): Observable<any> {
  
    return this.http.get(this.apiurlLib + '/' + libraryId);
  }

  create(library: LibraryDto): Observable<any> {

    return this.http.post(this.apiurlLib, library);
  }

  update( library : LibraryDto) : Observable<any>{
 
    return this.http.put(this.apiurlLib + '/' + library.libraryId, library);
  }

  delete(libraryId : number){

    return this.http.delete(this.apiurlLib + '/' + libraryId);
  }
  getBooksForLibrary(libraryId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiurlLib}/libraries/${libraryId}/books`);
  }


}
