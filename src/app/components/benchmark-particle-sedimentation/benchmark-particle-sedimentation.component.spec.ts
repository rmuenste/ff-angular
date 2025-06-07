import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkParticleSedimentationComponent } from './benchmark-particle-sedimentation.component';

describe('BenchmarkParticleSedimentationComponent', () => {
  let component: BenchmarkParticleSedimentationComponent;
  let fixture: ComponentFixture<BenchmarkParticleSedimentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchmarkParticleSedimentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkParticleSedimentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});