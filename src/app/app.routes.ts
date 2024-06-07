import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { VerifyLoginComponent } from './pages/verify-login/verify-login.component';
import { BookComponent } from './pages/Books/book/book.component';
import { BookAddComponent } from './pages/Books/book-add/book-add.component';
import { BookupdateComponent } from './pages/Books/bookupdate/bookupdate.component';
import { LibraryComponent } from './pages/Libraries/library/library.component';
import { LibraryAddComponent } from './pages/Libraries/library-add/library-add.component';
import { LibraryUpdateComponent } from './pages/Libraries/library-update/library-update.component';
import { ViewComponent } from './pages/Books/view/view.component';
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
  { path: 'books', component: BookComponent },
  { path: 'booksadd', component: BookAddComponent },
  { path: 'bookupdate/:bookId', component: BookupdateComponent },
  { path: 'view/:bookId', component: ViewComponent },
  { path: 'libraries', component: LibraryComponent },
  { path: 'librariesadd', component: LibraryAddComponent },
  { path: 'libraryupdate/:libraryId', component: LibraryUpdateComponent },
];
