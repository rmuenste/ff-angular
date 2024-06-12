import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkBubble2Component } from './benchmark-bubble2.component';

describe('BenchmarkBubble2Component', () => {
  let component: BenchmarkBubble2Component;
  let fixture: ComponentFixture<BenchmarkBubble2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchmarkBubble2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkBubble2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
