import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkBubble3Component } from './benchmark-bubble3.component';

describe('BenchmarkBubble3Component', () => {
  let component: BenchmarkBubble3Component;
  let fixture: ComponentFixture<BenchmarkBubble3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchmarkBubble3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkBubble3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
