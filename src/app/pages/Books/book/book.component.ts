import { Component } from '@angular/core';

import { Book } from '../../../models/book.models';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BooksService } from '../../../auth/BooksService/books.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor,CommonModule,RouterModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  books: Book[] = [];

  constructor(public bookService: BooksService) {}

  ngOnInit(): void {
    this.bookService.getAll().subscribe((data: Book[]) => {
      this.books = data;
    });
  }

  deleteBooks(bookId : number){
    this.bookService.deletebook(bookId).subscribe(res => {
      this.books = this.books.filter(item => item.bookId != bookId);
      alert("Delete Successful")
      
    })
  }

}
