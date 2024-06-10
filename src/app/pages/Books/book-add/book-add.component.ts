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
import { LibraryDto } from '../../../models/library-dto.models';

@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css',
})
export class BookAddComponent {
  form!: FormGroup;
  libraryIds: LibraryDto[] = [];

  constructor(private bookService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      bookId: new FormControl(null),
      bookTitle: new FormControl(null),
      author: new FormControl(null),
      libraryId: new FormControl(null),
    });

    this.bookService.getAllLibrary().subscribe((ids: LibraryDto[]) => {
      this.libraryIds = ids;
      console.log(ids);
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
