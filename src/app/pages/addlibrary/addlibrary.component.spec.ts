import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlibraryComponent } from './addlibrary.component';

describe('AddlibraryComponent', () => {
  let component: AddlibraryComponent;
  let fixture: ComponentFixture<AddlibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddlibraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddlibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
