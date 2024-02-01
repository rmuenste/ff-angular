import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarksMainComponent } from './benchmarks-main.component';

describe('BenchmarksMainComponent', () => {
  let component: BenchmarksMainComponent;
  let fixture: ComponentFixture<BenchmarksMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchmarksMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarksMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
