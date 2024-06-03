import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../../auth/auth-interceptor.service';

@Component({
  selector: 'app-verify-login',
  standalone: true,
  imports: [FormsModule],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  templateUrl: './verify-login.component.html',
  styleUrl: './verify-login.component.css',
})
export class VerifyLoginComponent implements OnInit{

  email: string = '';
  otp: string = '';


  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }
  
  verifyOtp(): void {
    this.authService.verifyLogin(this.email, this.otp).subscribe(response => {
      alert('OTP verified successfully.');
      localStorage.setItem('accessToken',response.token);
      this.router.navigate(['/']); // Update with your next route
    }, error => {
      alert('Invalid OTP.');
    });
  }
  
  }