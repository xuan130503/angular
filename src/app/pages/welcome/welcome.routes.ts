import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { RegisterComponent } from '../register/register.component';



export const WELCOME_ROUTES: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  
];
