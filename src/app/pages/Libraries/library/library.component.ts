import { Component } from '@angular/core';
import { LibraryDto } from '../../../models/library-dto.models';
import { LibraryService } from '../../../auth/LibraryService/library.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { BooksService } from '../../../auth/BooksService/books.service';
import { Book } from '../../../models/book.models';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NzTableModule,
    NzPopconfirmModule,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent {
  editCache: { [key: number]: { edit: boolean; data: LibraryDto } } = {};

  librarys: LibraryDto[] = [];
books : Book[] =[];

  constructor(
    private libraryService: LibraryService,
    private bookService: BooksService
  ) {}

  ngOnInit(): void {
    this.getAllLibrary();
  }

  getAllLibrary(): void {
    this.libraryService.getAllLibrary().subscribe((data: LibraryDto[]) => {
      this.librarys = data.map<LibraryDto>((e) => ({
        libraryId: e.libraryId,
        libraryName: e.libraryName,
        location: e.location,
        books: e.books,
        expand: e.books.length < 0 ? true : false,
      }));
    });
  }


  deleteLibrary(libraryId: number): void {
    this.libraryService.delete(libraryId).subscribe(() => {
      this.librarys = this.librarys.filter(
        (item) => item.libraryId !== libraryId
      );
      alert('Delete Successful');
    });
  }


  deleteBooks(bookId : number) : void{
    this.bookService.deletebook(bookId).subscribe(() => {
      this.books = this.books.filter((item) => item.bookId !== bookId),
      alert("asjdi")
    })
  }

}
