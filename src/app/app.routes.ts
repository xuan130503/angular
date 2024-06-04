import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { VerifyLoginComponent } from './pages/verify-login/verify-login.component';
import { LibrariesComponent } from './pages/libraries/libraries.component';
import { AddlibraryComponent } from './pages/addlibrary/addlibrary.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.routes').then((m) => m.WELCOME_ROUTES),
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify-login', component: VerifyLoginComponent },
  { path: 'libraries', component: LibrariesComponent},
  {path : 'addlibraries' , component : AddlibraryComponent}
];
