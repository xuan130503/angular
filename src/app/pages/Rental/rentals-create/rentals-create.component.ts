import { Component } from '@angular/core';
import {

  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RentalsService } from '../../../auth/RentalsService/rentals.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RentalsDto } from '../../../models/RentalsDto';
import { Book } from '../../../models/book.models';
import { LibraryUserDto } from '../../../models/LibraryUserDto';
import Swal from 'sweetalert2';
import { BooksService } from '../../../auth/BooksService/books.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { log } from 'console';

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
    NzTableModule,
    NzPopconfirmModule,
    NzSelectModule 
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
    private bookService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rentalsService.getallLIbraryUser().subscribe((data: LibraryUserDto[]) => {
      this.libraryUser = data;
    });
    
    this.bookService.getAll().subscribe((data: Book[]) => {
      this.book = data;
    });
  }

  onSubmit(): void {
    this.rentalsService.Create(this.rental).subscribe((rental) => {
      this.router.navigateByUrl('/getAllRental');
      Swal.fire({
        title: 'Good job!',
        text: 'You create successful',
        icon: 'success',
      });
    });
  }
}
