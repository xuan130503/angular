import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCalendarMode, NzCalendarModule } from 'ng-zorro-antd/calendar';
import { RentalsDto } from '../../../models/RentalsDto';
import { RentalsService } from '../../../auth/RentalsService/rentals.service';
import { CommonModule } from '@angular/common';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { log } from 'console';
import moment, { months } from 'moment';
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
  selectedMonth: Date = new Date();
  constructor(private rentalService: RentalsService) {}

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals(): void {
    const start = moment(this.selectedMonth).startOf('month').toISOString();
    const end = moment(this.selectedMonth).endOf('month').toISOString();

    this.rentalService
      .getAllRentals(null, start, end)
      .subscribe((data: RentalsDto[]) => {
        this.rentals = data;
        this.prepareCalendarData();
      });
  }

  prepareCalendarData(): void {
    let start = moment(this.selectedMonth).startOf('month');
    let end = moment(this.selectedMonth).endOf('month');

    for (let i = start; i <= end; i = i.add(1, 'd')) {
      var date = moment(i).format('yyyy-MM-DD');
      let item = this.rentals.filter(
        (e) => moment(e.rentalDate).format('yyyy-MM-DD') === date
      );

      if (item.length) {
        this.filteredRentals[moment(i).format('yyyy-MM-DD').toString()] = item;
       
      }
    }
  }

  triggerList(date: Date): RentalsDto[] {
    const key = moment(date).format('yyyy-MM-DD');
    return this.filteredRentals[key] || [];
  }
  onMonthChange(date: Date): void {
    this.selectedMonth = date;
    this.getRentals();
    
  }



}
