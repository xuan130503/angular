import { Component } from '@angular/core';

import { Book } from '../../../models/book.models';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BooksService } from '../../../auth/BooksService/books.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    CommonModule,
    RouterModule,
    NzTableModule,
    NzPopconfirmModule,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  editCache: { [key: number]: { edit: boolean; data: Book } } = {};
  books: Book[] = [];

  constructor(public bookService: BooksService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.bookService.getAll().subscribe((data: Book[]) => {
      this.books = data;
      this.updateEditCache();
    });
  }

  startEdit(id: number): void {
  this.editCache[id].edit = true;
  
  }

  cancelEdit(id: number): void {
    const index = this.books.findIndex((item) => item.bookId === id);
    this.editCache[id] = {
      data: { ...this.books[index] },
      edit: false,
    };
    console.log(index);
  }


  saveEdit(id: number): void {
    const updateBook = this.editCache[id].data;
    this.bookService.updateBook(updateBook).subscribe(() => {
      const index = this.books.findIndex((item) => item.bookId == id);
      Object.assign(this.books[index], updateBook);
      this.editCache[id].edit = false;
      
    });
  }

  updateEditCache(): void {
    this.books.forEach((item) => {
      this.editCache[item.bookId] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  deleteBooks(bookId: number): void {
    this.bookService.deletebook(bookId).subscribe((res) => {
      this.books = this.books.filter((item) => item.bookId !== bookId);
      alert('Delete Successful');
    });
  }
}
