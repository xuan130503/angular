import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
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

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(apiUrl+ `/register`, {
      username,
      email,
      password,
    });
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      apiUrl + `/login`,
      {
        username,
        password,
      },
      { headers }
    );
  }
  verifyLogin(email: string, code: string): Observable<any> {
    return this.http.post(apiUrl +`/verify-login?`, { email, code });
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
