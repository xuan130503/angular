import { Component } from '@angular/core';
import { LibraryDto } from '../../../models/library-dto.models';
import { LibraryService } from '../../../auth/LibraryService/library.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { BooksService } from '../../../auth/BooksService/books.service';
import { Book } from '../../../models/book.models';
import Swal from 'sweetalert2';

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
    CommonModule,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent {
  editCaches: { [key: number]: { edit: boolean; data: LibraryDto } } = {};
  editCacheBooks: { [key: number]: { edit: boolean; data: Book } } = {};
  librarys: LibraryDto[] = [];
  books: Book[] = [];

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
        expand: e.books.length > 0 ? false : true,
      }));
      this.updateEditCache();
    });
  }

  startEdit(id: number): void {
    this.editCaches[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.librarys.findIndex((item) => item.libraryId === id);
    this.editCaches[id] = {
      data: { ...this.librarys[index] },
      edit: false,
    };
  }

  updateEditCache(): void {
    this.librarys.forEach((item) => {
      this.editCaches[item.libraryId] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  saveEditCache(id: number): void {
    const update = this.editCaches[id].data;
    this.libraryService.update(update).subscribe(() => {
      const index = this.librarys.findIndex((item) => item.libraryId === id);
      Object.assign(this.librarys[index], update);
      this.editCaches[id].edit = false;
    });
    Swal.fire('Success!', 'Library updated successfully', 'success');
  }

  deleteLibrary(libraryId: number) {
    this.libraryService.delete(libraryId).subscribe(() => {
      this.librarys = this.librarys.filter(
        (item) => item.libraryId !== libraryId
      );
      Swal.fire('Deleted!', 'Library deleted successfully', 'success');
    });
  }

  startEditBooks(libraryId: number, bookId: number): void {
    const library = this.librarys.find((lib) => lib.libraryId === libraryId);
    if (library) {
      const book = library.books.find((book) => book.bookId === bookId);
      if (book) {
        this.editCacheBooks[book.bookId] = {
          edit: true,
          data: { ...book },
        };
      }
    }
  }

  cancelEditBooks(bookId: number): void {
    this.editCacheBooks[bookId] = {
      data: { ...this.books[bookId] },
      edit: false,
    };
  }
  saveEditCacheBooks(libraryId: number, bookId: number): void {
    const library = this.librarys.find((lib) => lib.libraryId === libraryId);
    if (library) {
      const book = library.books.find((book) => book.bookId === bookId);
      if (book) {
        const update = this.editCacheBooks[bookId].data;
        this.bookService.update(update).subscribe(() => {
          Object.assign(book, update);
          this.editCacheBooks[bookId].edit = false;
          Swal.fire('Success!', 'Library updated successfully', 'success');
        });
      }
    }
  }

  deleteBooks(libraryId: number, bookId: number): void {
    this.bookService.deletebook(bookId).subscribe(() => {
      const library = this.librarys.find(lib => lib.libraryId === libraryId);
      if (library) {
        library.books = library.books.filter(book => book.bookId !== bookId);
        Swal.fire('Deleted!', 'Library deleted successfully', 'success');
      }
    });
  }
}
