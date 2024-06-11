import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LibraryService } from '../../../auth/LibraryService/library.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './library-add.component.html',
  styleUrl: './library-add.component.css',
})
export class LibraryAddComponent {
  formLibrary!: FormGroup;

  constructor(private libraryService: LibraryService, private router: Router) {}

  ngOnInit(): void {
    this.formLibrary = new FormGroup({
      libraryId: new FormControl(''),
      libraryName: new FormControl(''),
      location: new FormControl(''),
      books: new FormArray([]),
    });
  }

  Submit() {
    console.log(this.formLibrary.value);
    this.libraryService.create(this.formLibrary.value).subscribe((res: any) => {
      alert('Post created successfully!');
      this.router.navigateByUrl('libraries');
    });
  }
}
