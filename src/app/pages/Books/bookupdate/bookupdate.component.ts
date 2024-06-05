import { Component } from '@angular/core';
import { Book } from '../../../models/book.models';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../../auth/BooksService/books.service';

@Component({
  selector: 'app-bookupdate',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './bookupdate.component.html',
  styleUrl: './bookupdate.component.css',
})
export class BookupdateComponent {
  bookId!: number;
  bookTitle! : string ;
  author! : string;
  libraryId! : number
  book!: Book;
  form!: FormGroup;

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['bookId'];
    this.bookService.getBookById(this.bookId).subscribe((data: Book) => {
      this.book = data;
    });
    this.form = new FormGroup({
      bookId: new FormControl(''),
      bookTitle: new FormControl(''),
      author: new FormControl(''),
      libraryId: new FormControl(''),
    });
  }

  submit() {
    const book = this.form.value as Book;
    this.bookService.updateBook(this.bookId, book).subscribe((data : any ) => {
        alert('Post updated successfully!');
        this.router.navigateByUrl('books');
      });
  }
}
