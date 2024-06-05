import { Component } from '@angular/core';
import { LibraryDto } from '../../../models/library-dto.models';
import { LibraryService } from '../../../auth/LibraryService/library.service';
import { NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [NgFor,FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent {
  librarys: LibraryDto[] = [];

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.libraryService.getAllLibrary().subscribe((data: LibraryDto[]) => {
      this.librarys = data;
      console.log(this.librarys);
    });
  }
 delete(libraryId : number){
  this.libraryService.delete(libraryId).subscribe(res => {
    this.librarys = this.librarys.filter(item => item.libraryId != libraryId);
    alert("Delete Successful")
  })
 }
}
