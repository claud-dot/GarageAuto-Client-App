import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpImageComponent } from './corp-image.component';

describe('CorpImageComponent', () => {
  let component: CorpImageComponent;
  let fixture: ComponentFixture<CorpImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorpImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
