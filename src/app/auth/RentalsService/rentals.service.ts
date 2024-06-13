import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalsDto } from '../../models/RentalsDto';

@Injectable({
  providedIn: 'root',
})
export class RentalsService {
  private apiUrl = 'http://localhost:5013/api/rentals';

  private url ='http://localhost:5013/api/libraryUser';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(rentalsId: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + rentalsId);
  }

  Create(rentals: RentalsDto): Observable<any> {
    return this.http.post(this.apiUrl, rentals);
  }

  Update(rentals: RentalsDto): Observable<any> {
    return this.http.put(this.apiUrl + '/' + rentals.rentalid, rentals);
  }

  Delete(rentalId: number) {
    return this.http.delete(this.apiUrl + '/' + rentalId);
  }

getallLIbraryUser():Observable<any>{
  return this.http.get(this.url);
}



}
