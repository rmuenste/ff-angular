import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-shape-plot',
  templateUrl: './shape-plot.component.html',
  styleUrls: ['./shape-plot.component.scss']
})
export class ShapePlotComponent implements OnInit {
  @Input() inputGraph: any;

  selectedLevel: number;
  graph: any = {};
  theGraph: any = {};
  numLevels: number = 0;

  constructor(private cdr: ChangeDetectorRef) {
    this.selectedLevel = 0;
   }

  ngOnInit(): void {
    this.theGraph = JSON.parse(JSON.stringify(this.inputGraph));
    this.graph.data = this.theGraph.data[this.selectedLevel];
    this.graph.layout = this.theGraph.layout;
    //let val = `Level ${this.selectedLevel + 1}`;
  }

  changeLevel(event: MatRadioChange): void {
    this.graph.data = this.theGraph.data[this.selectedLevel];
    this.cdr.detectChanges();
  }
}

