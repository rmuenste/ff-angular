import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
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
  displayGraph: any = {};
  originalGraph: any = {};
  numLevels: number = 0;

  constructor(private cdr: ChangeDetectorRef) {
    this.selectedLevel = 0;

  }

  ngOnInit(): void {
    this.originalGraph = JSON.parse(JSON.stringify(this.graph));
    this.displayGraph.data = this.originalGraph.data[this.selectedLevel];
    this.displayGraph.layout = this.originalGraph.layout;
    this.numLevels = this.graph.data.length;
  }

  g3change(event: MatCheckboxChange): void {
    // Clear the displayGraph array
    if (this.displayGraph.layout.title.text !== "Bubble Size Plot") {
      this.displayGraph.data.splice(0, this.displayGraph.data.length);
      this.originalGraph = JSON.parse(JSON.stringify(this.graph));

        for(let i = 0; i < this.showTimeStepG1.length; i++) {
          if(this.showTimeStepG1[i]) {
            this.displayGraph.data.push(this.originalGraph.data[this.selectedLevel][i]);
          }
        }
      }
      else {
        this.displayGraph.data.splice(0, this.displayGraph.data.length);
        this.originalGraph = JSON.parse(JSON.stringify(this.graph));

        for(let i = 0; i < this.showTimeStepG1.length; i++) {
          if(this.showTimeStepG1[i]) {
            this.displayGraph.data.push(this.originalGraph.data[this.selectedLevel][2*i]);
            this.displayGraph.data.push(this.originalGraph.data[this.selectedLevel][2*i+1]);
          }
        }
      }
  }

  changeLevel(event: MatRadioChange): void {
    this.displayGraph.data = this.originalGraph.data[this.selectedLevel];
    for(let i = 0; i < this.showTimeStepG1.length; i++) {
        this.showTimeStepG1[i] = true;
    }
    this.cdr.detectChanges();
  }

}
