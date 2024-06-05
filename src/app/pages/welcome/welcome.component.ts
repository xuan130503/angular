import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/AuthService/auth.service';
import { AuthInterceptorService } from '../../auth/auth-interceptor.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  providers: [
    AuthService,

  ],
  imports: [FormsModule, HttpClientModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    // this.http.get('http://localhost:5013/WeatherForecast').subscribe((data) => {
    //   console.log(data);
    // });
  }

}
