import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsCreateComponent } from './rentals-create.component';

describe('RentalsCreateComponent', () => {
  let component: RentalsCreateComponent;
  let fixture: ComponentFixture<RentalsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalsCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
