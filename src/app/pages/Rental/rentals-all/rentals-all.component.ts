import { Component } from '@angular/core';
import { RentalsService } from '../../../auth/RentalsService/rentals.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterLink } from '@angular/router';
import { RentalsDto, UpdateRentalDto } from '../../../models/RentalsDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rentals-all',
  standalone: true,
  imports: [FormsModule, NgFor, NzTableModule, CommonModule, NgIf, RouterLink],
  templateUrl: './rentals-all.component.html',
  styleUrl: './rentals-all.component.css',
})
export class RentalsAllComponent {
  rentals: RentalsDto[] = [];
  editCache: { [key: number]: { edit: boolean; data: RentalsDto } } = {};
  isReturn: boolean | null = null;

  constructor(private rentalService: RentalsService) {}

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService.getAllRentals(this.isReturn).subscribe(
      (data) => {
        this.rentals = data;
        this.updateEditCache();
      },
      (error) => console.error(error)
    );
  }

  onFilterChange(event: any): void {
    const value = event.target.value;
    this.isReturn = value === 'all' ? null : value === 'true';
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