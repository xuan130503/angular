import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface librariesDto {
  libraryId: number;
  libraryName: string;
  location: string;
  books: [];
}

export interface bookdto {
  bookId: number;
  booktitle: string;
  author: string;
  librariesId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthLibrariesService {
  private apiUrlLib = 'http://localhost:5013/api/libraries';

  constructor(private http: HttpClient) {}

  getAllLibraries(): Observable<librariesDto[]> {
    return this.http.get<librariesDto[]>(`${this.apiUrlLib}`);
  }

  get(id: any): Observable<librariesDto> {
    return this.http.get<librariesDto>(`${this.apiUrlLib}/${id}`);
  }

  create(librariesDto : librariesDto): Observable<any> {
    return this.http.post(this.apiUrlLib, librariesDto);
  }

  // update(id: any, data: any): Observable<any> {
  //   return this.http.put(`${this.apiUrlLib}/${id}`, data);
  // }

  // delete(id: any, data: any): Observable<any> {
  //   return this.http.delete(`${this.apiUrlLib}/${id}`);
  // }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(this.apiUrlLib);
  // }
}
