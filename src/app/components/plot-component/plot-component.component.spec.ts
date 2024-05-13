import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotComponentComponent } from './plot-component.component';

describe('PlotComponentComponent', () => {
  let component: PlotComponentComponent;
  let fixture: ComponentFixture<PlotComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
