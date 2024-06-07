import { Component } from '@angular/core';
import { LibraryDto } from '../../../models/library-dto.models';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibraryService } from '../../../auth/LibraryService/library.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-library-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './library-update.component.html',
  styleUrl: './library-update.component.css',
})
export class LibraryUpdateComponent {
  libraryId!: number;
  library!: LibraryDto;
  formlibrary!: FormGroup;

  constructor(private libraryService : LibraryService, private route : ActivatedRoute, private router : Router){}



ngOnInit(): void {

  this.libraryId = this.route.snapshot.params['libraryId']; 
  this.libraryService.getLibraryById(this.libraryId).subscribe((data : any) => {
    this.library = data;
  });
  this.formlibrary = new FormGroup({
    libraryId : new FormControl(''),
    libraryName : new FormControl(''),
    location : new FormControl(''),
    books : new FormArray([]),
  });
}

 submit(){
  const library = this.formlibrary.value as LibraryDto;
  this.libraryService.update(this.libraryId,library).subscribe((data : any) => {
    alert("update successfully");
    this.router.navigateByUrl('/libraries')
  })
 }
}
