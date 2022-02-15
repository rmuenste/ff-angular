import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkExampleComponent } from './benchmark-example.component';

describe('BenchmarkExampleComponent', () => {
  let component: BenchmarkExampleComponent;
  let fixture: ComponentFixture<BenchmarkExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchmarkExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
