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
  login(data: any): Observable<any> {
    return this.http.post(apiUrl + `/login`, data,httpOptions);
  }
  logout() {
    localStorage.removeItem('accessToken');
  }

  isLoggedIn() {
    return localStorage.getItem('accessToken');
  }
  logOut() {
    return localStorage.removeItem('accessToken')
  }


}
