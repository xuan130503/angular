import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCalendarMode, NzCalendarModule } from 'ng-zorro-antd/calendar';
import { RentalsDto } from '../../../models/RentalsDto';
import { RentalsService } from '../../../auth/RentalsService/rentals.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rental-calendar',
  standalone: true,
  imports: [FormsModule, NzCalendarModule, CommonModule],
  templateUrl: './rental-calendar.component.html',
  styleUrl: './rental-calendar.component.css',
})
export class RentalCalendarComponent {
  date: Date = new Date();
  mode: 'month' | 'year' = 'month';
  rentals: RentalsDto[] = [];
  filteredRentals: RentalsDto[] = [];
  constructor(private rentalService: RentalsService) {}

  ngOnInit(): void {}

  getRentals(): void {
    this.rentalService.getAllRentals(null).subscribe((data) => {
      this.rentals = data;
    });
  }
  panelChange(change: { date: Date; mode: 'month' | 'year' }): void {
    this.date = change.date;
    this.mode = change.mode;
  }
  // filterRentals(): void {
  //   const startDate = new Date(
  //     this.date.getFullYear(),
  //     this.date.getMonth(),
  //     1
  //   );
  //   const endDate = new Date(
  //     this.date.getFullYear(),
  //     this.date.getFullYear() + 1,
  //     0
  //   );
  //   this.filteredRentals = this.rentals.filter((rental) => {
  //     const rentalDate = new Date(rental.rentalDate);
  //     return rentalDate >= startDate && rentalDate <= endDate;
  //   });
  // }
}
