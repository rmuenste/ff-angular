import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-plot',
  templateUrl: './base-plot.component.html',
  styleUrls: ['./base-plot.component.scss']
})
export class BasePlotComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() layout: any = {};
  @Input() config: any = {};
  @Input() useResizeHandler: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}