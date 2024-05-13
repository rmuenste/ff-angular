import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-plot-component',
  templateUrl: './plot-component.component.html',
  styleUrls: ['./plot-component.component.scss']
})
export class PlotComponentComponent implements OnInit {
  @Input() graph: any;
  @Input() showTimeSteps!: string[];
  @Input() levels!: string[];
  selectedLevel: string;
  showTimeStepG1: boolean[] = [false, false, false, false];

  constructor() {

    this.selectedLevel = 'Level 2';
  }


  ngOnInit(): void {
  }

  g3change(event: any): void {
    // Your checkbox change logic here
  }

  changeLevel(event: any): void {
    // Your radio button change logic here
  }

}
