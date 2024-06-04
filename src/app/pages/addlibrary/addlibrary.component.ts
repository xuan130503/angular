import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthLibrariesService } from '../../auth/auth-libraries.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-addlibrary',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule,NgFor],
  templateUrl: './addlibrary.component.html',
  styleUrl: './addlibrary.component.css',
})
export class AddlibraryComponent {
  libraryForm: FormGroup ;
  constructor(
    private librariService: AuthLibrariesService,
    private fb: FormBuilder
  ) {
    this.libraryForm = this.fb.group({
      libraryId: ['', Validators.required],
      bookTitle: ['', Validators.required],
      location: ['', Validators.required],
      // books: this.fb.array([]),
    });
  }

  // get books(): FormArray {
  //   return this.libraryForm.get('books') as FormArray;
  // }
  // addBook() {
  //   const bookForm = this.fb.group({
  //     bookId: ['', Validators.required],
  //     booksTitle: ['', Validators.required],
  //     author: ['', Validators.required],
  //     libraryId: ['', Validators.required],
  //   });
  //   this.books.push(bookForm);
  // }
  // removeBook(index: number) {
  //   this.books.removeAt(index);
  // }

  onSubmit() {
    if (this.libraryForm.valid) {
      this.librariService
        .create(this.libraryForm.value)
        .subscribe((response) => {
          console.log('Library create Successfully! ', response);
        });
    }
  }
}
