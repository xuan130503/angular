import { Component, OnInit } from '@angular/core';
import { AuthLibrariesService, librariesDto } from '../../auth/auth-libraries.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-libraries',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgFor],
  providers: [
    AuthService,
  ],
  
  templateUrl: './libraries.component.html',
  styleUrl: './libraries.component.css'
})
export class LibrariesComponent  implements OnInit{
   libraries : librariesDto[] = [];

  constructor(private librariesService : AuthLibrariesService){}
  ngOnInit(): void {
    this.librariesService.getAllLibraries().subscribe((data) => {
      this.libraries = data;
    })
  }


}
