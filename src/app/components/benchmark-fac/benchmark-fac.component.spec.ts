import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkFacComponent } from './benchmark-fac.component';

describe('BenchmarkFacComponent', () => {
  let component: BenchmarkFacComponent;
  let fixture: ComponentFixture<BenchmarkFacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchmarkFacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkFacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
