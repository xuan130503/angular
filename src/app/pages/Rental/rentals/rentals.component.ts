import { Component, OnInit } from '@angular/core';
import { RentalsDto } from '../../../models/RentalsDto';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RentalsService } from '../../../auth/RentalsService/rentals.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, CommonModule, RouterModule],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.css',
})
export class RentalsComponent implements OnInit {
  rentals: RentalsDto[] = [];
  constructor(private rentalService: RentalsService) {}
  ngOnInit(): void {
    this.rentalService.getAll().subscribe((data: RentalsDto[]) => {
      this.rentals = data;
      console.log(this.rentals);
    });
  }
}
