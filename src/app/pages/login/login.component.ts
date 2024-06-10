import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/AuthService/auth.service';
import { AuthInterceptorService } from '../../auth/auth-interceptor.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    NgIf,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  protected loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService
        .login(this.loginForm.value)

        .subscribe((data: any) => {
          const token = localStorage.setItem('accessToken', data.token);
          if (this.authService.isLoggedIn()) {
            this.router.navigate(['/welcome']);
          }
          console.log(data);
        });
    }
  }
}
