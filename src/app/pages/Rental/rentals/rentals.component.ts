import { Component, OnInit } from '@angular/core';
import { RentalsDto } from '../../../models/RentalsDto';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RentalsService } from '../../../auth/Rentals/rentals.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
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
