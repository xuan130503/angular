import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { BooksService } from '../../../auth/BooksService/books.service';

@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css',
})
export class BookAddComponent {
  form!: FormGroup;

  constructor(private bookService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      bookId: new FormControl(''),
      bookTitle: new FormControl(''),
      author: new FormControl(''),
      libraryId: new FormControl(''),
    });
  }

  submit() {
    console.log(this.form.value);
    this.bookService.create(this.form.value).subscribe((res: any) => {
      alert('Post created successfully!');
      this.router.navigateByUrl('books');
    });
  }
}
