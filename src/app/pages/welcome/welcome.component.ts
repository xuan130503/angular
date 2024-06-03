import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { AuthInterceptorService } from '../../auth/auth-interceptor.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  imports: [FormsModule, HttpClientModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.http.get('http://localhost:5013/WeatherForecast').subscribe((data) => {
      console.log(data);
    });
  }
  // login(): void {
  //   // Assuming you have a login method in your AuthService that sets the token
  //   this.authService.setToken('your-token-here');
  // }
}
