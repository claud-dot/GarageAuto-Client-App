import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InoviceComponent } from './inovice.component';

describe('InoviceComponent', () => {
  let component: InoviceComponent;
  let fixture: ComponentFixture<InoviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InoviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InoviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
