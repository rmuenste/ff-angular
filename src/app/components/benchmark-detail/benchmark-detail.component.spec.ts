import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkDetailComponent } from './benchmark-detail.component';

describe('BenchmarkDetailComponent', () => {
  let component: BenchmarkDetailComponent;
  let fixture: ComponentFixture<BenchmarkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchmarkDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
