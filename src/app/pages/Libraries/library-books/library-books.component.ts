import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LibraryBooksService } from '../../../auth/LibraryBooks/library-books.service';
import { response } from 'express';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-library-books',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './library-books.component.html',
  styleUrl: './library-books.component.css',
})
export class LibraryBooksComponent {
  libraryForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private libraryBooksService: LibraryBooksService
  ) {
    this.libraryForm = new FormGroup({
      libraryName: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      books: this.fb.array([this.createBook()]),
    });
  }
  createBook(): FormGroup {
    return this.fb.group({
      bookTitle: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  get books(): FormArray {
    return this.libraryForm.get('books') as FormArray;
  }

  addBook(): void {
    this.books.push(this.createBook());
  }

  removeBook(index: number): void {
    this.books.removeAt(index);
  }

  onSubmit(): void {
    if (this.libraryForm.valid) {
      this.libraryBooksService
        .CreateLibraryBooks(this.libraryForm.value)
        .subscribe(
          (response) => {
            alert('Library and books added successfully');
          },
          (error) => {
            alert('Error adding library and books');
          }
        );
    }
  }
}
