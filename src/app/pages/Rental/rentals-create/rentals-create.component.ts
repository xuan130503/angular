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
  constructor(
    private rentalsService: RentalsService,
    private fb: FormBuilder
  ) {}
  rentalForm!: FormGroup;
  ngOnInit(): void {
    this.rentalForm = this.fb.group({
      bookId: ['', Validators.required],
      userid: ['', Validators.required],
      rentalDate: [new Date().toISOString().split('T')[0], Validators.required], // Set current date
      // returnDate: [''],
    });
  }

  onSubmit(): void {
    if (this.rentalForm.valid) {
      this.rentalsService.Create(this.rentalForm.value).subscribe(
        (response) => {
          console.log('Rental created successfully:', response);
          // Optionally reset the form or navigate to another page
          this.rentalForm.reset();
        },
        (error) => {
          console.error('Error creating rental:', error);
        }
      );
    }
  }
}
