import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativePlotComponent } from './comparative-plot.component';

describe('ComparativePlotComponent', () => {
  let component: ComparativePlotComponent;
  let fixture: ComponentFixture<ComparativePlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparativePlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
