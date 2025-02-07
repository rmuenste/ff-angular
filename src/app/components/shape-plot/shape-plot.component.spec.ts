import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapePlotComponent } from './shape-plot.component';

describe('ShapePlotComponent', () => {
  let component: ShapePlotComponent;
  let fixture: ComponentFixture<ShapePlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapePlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
