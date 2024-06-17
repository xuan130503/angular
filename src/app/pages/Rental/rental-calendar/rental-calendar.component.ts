import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCalendarMode, NzCalendarModule } from 'ng-zorro-antd/calendar';
import { RentalsDto } from '../../../models/RentalsDto';
import { RentalsService } from '../../../auth/RentalsService/rentals.service';
import { CommonModule } from '@angular/common';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { log } from 'console';
import moment from 'moment';
import { NgLoadingTextTemplateDirective } from '@ng-select/ng-select';

@Component({
  selector: 'app-rental-calendar',
  standalone: true,
  imports: [
    FormsModule,
    NzCalendarModule,
    CommonModule,
    CommonModule,
    NzBadgeModule,
  ],
  templateUrl: './rental-calendar.component.html',
  styleUrl: './rental-calendar.component.css',
})
export class RentalCalendarComponent {
  rentals: RentalsDto[] = [];
  filteredRentals: { [key: string]: RentalsDto[] } = {};
  constructor(private rentalService: RentalsService) {}

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals(): void {
    this.rentalService.getAllRentals(null).subscribe((data) => {
      this.rentals = data;
      this.prepareCalendarData();
    });
  }

  prepareCalendarData(): void {
    let start = moment().startOf('M');
    let end = moment().endOf('M');

    for (let i = start; i < end; i = i.add(1, 'd')) {
      let item = this.rentals.filter(
        (e) =>
          moment(e.rentalDate).format('DD-MM-yyyy') ==
          moment(i).format('DD-MM-yyyy')
      );
      if (item.length) {
        this.filteredRentals[moment(i).format('DD-MM-yyyy').toString()] = item;
      }
    }
  }

  triggerList(date: Date) {
    let key = moment(date).format('DD-MM-yyyy').toString();    
    return this.filteredRentals[key] ? this.filteredRentals[key] : [];
  }
}
