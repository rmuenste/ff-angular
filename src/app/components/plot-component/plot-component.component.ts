import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-plot-component',
  templateUrl: './plot-component.component.html',
  styleUrls: ['./plot-component.component.scss']
})
export class PlotComponentComponent implements OnInit {
  @Input() graph: any;
  /*
  @Input() showTimeSteps!: string[];
  @Input() levels!: string[];
  */
  selectedLevel: number;
  showTimeStepG1: boolean[] = [true, true, true, true];
  graph3: any = {};
  theGraph: any = {};
  numLevels: number = 0;

  constructor() {
    this.selectedLevel = 0;

  }

  ngOnInit(): void {
    this.theGraph = JSON.parse(JSON.stringify(this.graph));
    this.graph3.data = this.theGraph.data[this.selectedLevel];
    this.graph3.layout = this.theGraph.layout;
    this.numLevels = this.graph.data.length;
  }

  g3change(event: MatCheckboxChange): void {
    // Clear the graph3 array
    this.graph3.data.splice(0, this.graph3.data.length);
    this.theGraph = JSON.parse(JSON.stringify(this.graph));

    for(let i = 0; i < this.showTimeStepG1.length; i++) {
      if(this.showTimeStepG1[i]) {
        this.graph3.data.push(this.theGraph.data[this.selectedLevel][i]);
      }
    }
  }

  changeLevel(event: MatRadioChange): void {
    this.graph3.data = this.theGraph.data[this.selectedLevel];
  }

}
