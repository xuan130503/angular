import { Component } from '@angular/core';
import { RentalsService } from '../../../auth/RentalsService/rentals.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterLink, RouterModule } from '@angular/router';
import { RentalsDto, UpdateRentalDto } from '../../../models/RentalsDto';
import Swal from 'sweetalert2';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { provideClientHydration } from '@angular/platform-browser';
import moment from 'moment';
@Component({
  selector: 'app-rentals-all',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    CommonModule,
    RouterModule,
    NzTableModule,
    NzPopconfirmModule,
    NzSelectModule,
  ],
  templateUrl: './rentals-all.component.html',
  styleUrl: './rentals-all.component.css',
})
export class RentalsAllComponent {
  rentals: RentalsDto[] = [];
  isReturn: boolean | null = null;
  editCache: { [key: number]: { edit: boolean; data: RentalsDto } } = {};

  start : string | null = null;
  end : string | null = null;

  constructor(private rentalService: RentalsService) {}

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService
      .getAllRentals(this.isReturn, this.start,this.end).subscribe((data: RentalsDto[]) => {
 this.rentals = data;
        this.updateEditCache();
      });
  }

  onFilterChange(event?: any): void {
    const value = event;
    this.isReturn =
      value === 'all' ? null : value === 'returnRentals' ? true : false;
    this.loadRentals();
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.rentals.findIndex((item) => item.rentalid === id);
    this.editCache[id] = {
      data: { ...this.rentals[index] },
      edit: false,
    };
  }

  saveEdit(id: number): void {
    const updatedRental = this.editCache[id].data;
    const updateDto: UpdateRentalDto = {
      returnDate: updatedRental.returnDate || null,
    };

    this.rentalService.updateRental(id, updateDto).subscribe(
      () => {
        const index = this.rentals.findIndex((item) => item.rentalid == id);
        Object.assign(this.rentals[index], updatedRental);
        this.editCache[id].edit = false;
        Swal.fire({
          title: 'Success!',
          text: 'Rental updated successfully',
          icon: 'success',
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update rental',
          icon: 'error',
        });
        console.error('Error updating rental', error);
      }
    );
  }

  updateEditCache(): void {
    this.rentals.forEach((item) => {
      this.editCache[item.rentalid] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  deleteRental(rentalId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this rental?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rentalService.deleteRental(rentalId).subscribe(
          () => {
            this.rentals = this.rentals.filter(
              (item) => item.rentalid !== rentalId
            );
            Swal.fire({
              title: 'Deleted!',
              text: 'Rental deleted successfully',
              icon: 'success',
            });
          },
          (error) => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete rental',
              icon: 'error',
            });
            console.error('Error deleting rental', error);
          }
        );
      }
    });
  }
}
