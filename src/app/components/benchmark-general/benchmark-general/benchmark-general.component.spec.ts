import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkGeneralComponent } from './benchmark-general.component';

describe('BenchmarkGeneralComponent', () => {
  let component: BenchmarkGeneralComponent;
  let fixture: ComponentFixture<BenchmarkGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchmarkGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
