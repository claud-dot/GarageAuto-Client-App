import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveCarListComponent } from './receive-car-list.component';

describe('ReceiveCarListComponent', () => {
  let component: ReceiveCarListComponent;
  let fixture: ComponentFixture<ReceiveCarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveCarListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
