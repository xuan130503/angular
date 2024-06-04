import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { AuthInterceptorService } from '../../auth/auth-interceptor.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [
    AuthService,
    
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  register(): void {
    this.authService.register(this.username, this.email, this.password)
      .subscribe(
        response => {
          alert('Registration successful');
        },
        error => {
          alert('Registration failed');
        }
      );
  }
}