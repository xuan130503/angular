import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryDto } from '../../models/library-dto.models';

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

  update(libraryId : number, library : LibraryDto) : Observable<any>{
 
    return this.http.put(this.apiurlLib + '/' + libraryId, library);
  }

  delete(libraryId : number){

    return this.http.delete(this.apiurlLib + '/' + libraryId);
  }



}
