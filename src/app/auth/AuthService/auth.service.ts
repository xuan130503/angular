import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

const apiUrl = 'http://localhost:5013/api/Authenticate';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post(`${apiUrl}/register`, data);
  }
  // login(data: any) {
  //   return this.http.post(`${apiUrl}/login`, data).pipe(
  //     tap((result) => {
  //       localStorage.setItem('accessToken', JSON.stringify(result));
  //     })
  //   );
  // }

  login(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(apiUrl + `/login`, data, { headers });
  }
  logout() {
    localStorage.removeItem('accessToken');
  }

  isLoggedIn() {
    return localStorage.getItem('accessToken');
  }
}
