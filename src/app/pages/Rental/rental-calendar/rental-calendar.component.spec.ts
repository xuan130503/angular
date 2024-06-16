import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalCalendarComponent } from './rental-calendar.component';

describe('RentalCalendarComponent', () => {
  let component: RentalCalendarComponent;
  let fixture: ComponentFixture<RentalCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
