import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsAllComponent } from './rentals-all.component';

describe('RentalsAllComponent', () => {
  let component: RentalsAllComponent;
  let fixture: ComponentFixture<RentalsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalsAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
