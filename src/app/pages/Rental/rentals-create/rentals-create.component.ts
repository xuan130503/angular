import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RentalsService } from '../../../auth/RentalsService/rentals.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RentalsDto } from '../../../models/RentalsDto';
import { Book } from '../../../models/book.models';
import { LibraryUserDto } from '../../../models/LibraryUserDto';
import Swal from 'sweetalert2';
import { BooksService } from '../../../auth/BooksService/books.service';
import { da_DK } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-rentals-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    NgIf,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './rentals-create.component.html',
  styleUrl: './rentals-create.component.css',
})
export class RentalsCreateComponent {
  libraryUser: LibraryUserDto[] = [];
  book: Book[] = [];
  rental: RentalsDto = {
    rentalid: 0,
    rentalDate: new Date(),
    returnDate: null,
    bookId: 0,
    userId: 0,
    book: {} as Book,
    libraryUser: {} as LibraryUserDto,
  };
  libraryId: any;

  constructor(
    private rentalsService: RentalsService,
    private bookService: BooksService
  ) {}
  ngOnInit(): void {
    this.rentalsService
      .getallLIbraryUser()
      .subscribe((data: LibraryUserDto[]) => {
        this.libraryUser = data;
      }),
      this.bookService.getAll().subscribe((data: Book[]) => {
        this.book = data;
      });
  }

  onSubmit(): void {
    this.rentalsService.Create(this.rental).subscribe((rental) => {
      Swal.fire({
        title: 'Good job!',
        text: 'You create successful',
        icon: 'success',
      });
    });
  }
}
