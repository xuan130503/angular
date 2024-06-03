import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5013/api/Authenticate';

  private token: string | null = null;


  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      username,
      email,
      password,
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, {
      username,
      password,
    });
  }
  verifyLogin(email: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-login?`, { email, code });
  }

  

}
