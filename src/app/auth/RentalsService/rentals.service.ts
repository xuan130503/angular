import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalsDto, UpdateRentalDto } from '../../models/RentalsDto';

@Injectable({
  providedIn: 'root',
})
export class RentalsService {
  private apiUrl = 'http://localhost:5013/api/rentals';

  // private apiUrls ='http://localhost:5013/api/rentals?isRetun=false'

  private url = 'http://localhost:5013/api/libraryUser';
  constructor(private http: HttpClient) {}
  getAllRentals(isReturn: boolean | null): Observable<RentalsDto[]> {
    let params = new HttpParams();
    if (isReturn !== null) {
      params = params.append('isReturn', String(isReturn));
    }
    const url = `${this.apiUrl}/`;
    return this.http.get<any[]>(url, { params });
  }
  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(rentalsId: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + rentalsId);
  }

  Create(rentals: RentalsDto): Observable<any> {
    return this.http.post(this.apiUrl, rentals);
  }

  getallLIbraryUser(): Observable<any> {
    return this.http.get(this.url);
  }

  updateRental(id: number, updateRentalDto: UpdateRentalDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updateRentalDto);
  }
  deleteRental(rentalid: number) {
    return this.http.delete(this.apiUrl + '/' + rentalid);
  }
}
