import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { BookComponent } from './pages/Books/book/book.component';
import { BookAddComponent } from './pages/Books/book-add/book-add.component';
import { LibraryComponent } from './pages/Libraries/library/library.component';
import { LibraryAddComponent } from './pages/Libraries/library-add/library-add.component';
import { authGuard } from './auth/auth/auth.guard';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { RentalsCreateComponent } from './pages/Rental/rentals-create/rentals-create.component';
import { RentalsAllComponent } from './pages/Rental/rentals-all/rentals-all.component';
import { RentalCalendarComponent } from './pages/Rental/rental-calendar/rental-calendar.component';
export const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BookComponent, canActivate: [authGuard] },
  { path: 'booksadd', component: BookAddComponent },
  { path: 'libraries', component: LibraryComponent, canActivate: [authGuard] },
  { path: 'librariesadd', component: LibraryAddComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [authGuard]},
  { path: 'rentalCreate', component: RentalsCreateComponent },
  { path: 'getAllRental', component: RentalsAllComponent },
  { path: 'dashboard', component: RentalCalendarComponent },
];
