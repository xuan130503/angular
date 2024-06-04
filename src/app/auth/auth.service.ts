import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable, tap } from 'rxjs';


interface LoginResponse {
  token: string;
  expiration: string;
}

interface Response {
  status: string;
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5013/api/Authenticate';

 

  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      username,
      email,
      password,
    });
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      username,
      password,
    },{headers});
  }
  verifyLogin(email: string, code: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/verify-login?`, { email, code });
  }

  
  // verifyLogin(email: string, code: string): Observable<LoginResponse> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<LoginResponse>(`${this.apiUrl}/verify-login`, { email, code }, { headers })
  //     .pipe(
  //       tap(response => {
  //         localStorage.setItem('token', response.token);
  //       })
  //     );
  // }
  // logout(){
  //   localStorage.removeItem('token');

  // }


}
