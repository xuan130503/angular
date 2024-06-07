import { Component } from '@angular/core';
import { Book } from '../../../models/book.models';
import { BooksService } from '../../../auth/BooksService/books.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/AuthService/auth.service';
import { AuthInterceptorService } from '../../../auth/auth-interceptor.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,ReactiveFormsModule],
  providers: [
    
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent {
  bookId! : number;
  book!: Book;

  constructor(
    public bookService: BooksService,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['bookId'];
    const id = 1;
this.bookService.getBookById(id).subscribe((data : Book) => {console.log(data);
  this.book = data;
})
 
  }

}
