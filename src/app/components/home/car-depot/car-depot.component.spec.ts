import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDepotComponent } from './car-depot.component';

describe('CarDepotComponent', () => {
  let component: CarDepotComponent;
  let fixture: ComponentFixture<CarDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
