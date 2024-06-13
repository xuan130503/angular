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
  libraryUser : LibraryUserDto[] =[];
  rental: RentalsDto = {
    rentalid: 0,
    rentalDate: new Date,
    returnDate: null,
    bookid: 0,
    userid: 0,
    book: {} as Book,
    libraryUser: {} as LibraryUserDto,
  };
libraryIds: any;

  constructor(private rentalsService: RentalsService) {}
  ngOnInit(): void {
    this.rentalsService.getallLIbraryUser().subscribe((data : LibraryUserDto[]) => {
      this.libraryUser = data;
    })
  }

  onSubmit(): void {
    this.rentalsService.Create(this.rental).subscribe((rental) => {
      Swal.fire({
        title: "Good job!",
        text: "You create successful",
        icon: "success"
      });
    })
  }
}
