import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineAverageChartComponent } from './line-average-chart.component';

describe('LineChartComponent', () => {
  let component: LineAverageChartComponent;
  let fixture: ComponentFixture<LineAverageChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineAverageChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineAverageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
