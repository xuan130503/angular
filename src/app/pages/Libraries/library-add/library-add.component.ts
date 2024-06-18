import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LibraryService } from '../../../auth/LibraryService/library.service';
import { Router, RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NgFor, NgIf } from '@angular/common';
import { LibraryDto } from '../../../models/library-dto.models';
import { BooksService } from '../../../auth/BooksService/books.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-library-add',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzPopconfirmModule,
    NgFor,
    NgIf,
    FormsModule,
    RouterModule
  ],
  templateUrl: './library-add.component.html',
  styleUrl: './library-add.component.css',
})
export class LibraryAddComponent {
  libraries: LibraryDto[] = [];
  library: LibraryDto = {
    libraryId: 0,
    libraryName: '',
    location: '',
    expand: false,
    books: [],
  };

  constructor(
    private libreryService: LibraryService,
    private router: Router,
    private bookService: BooksService
  ) {}

  ngOnInit(): void {}
  addLibrary(): void {

    if (this.library.books.some((book) => !book.bookTitle.trim()) || this.library.books.some((book) => !book.author.trim()) ) {
      Swal.fire({
        title: 'Error!',
        text: 'Book Title is required for all books.',
        icon: 'error',
      });
      return;
    }

    this.libreryService.create(this.library).subscribe(
      (library) => {
        // alert(' succussfull');console.log(library)
        this.libraries.push(library);
        this.library = {
          libraryId: 0,
          libraryName: '',
          location: '',
          expand: false,
          books: [
            {
              bookId: 0,
              bookTitle: '',
              author: '',
              libraryId: library.libraryId,
            },
          ],
        };
        Swal.fire({
          title: 'Good job!',
          text: 'You create successful',
          icon: 'success',
        });
        this.router.navigateByUrl('libraries');
      },
      (error) => console.error(error)
    );
  }

  addBook(library: LibraryDto): void {
    library.books.push({ bookId: 0, bookTitle: '', author: '', libraryId: 0 });
  }

  removeBook(library: LibraryDto, index: number): void {
    library.books.splice(index, 1);
  }
}
