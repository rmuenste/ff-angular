import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-comparative-plot',
  templateUrl: './comparative-plot.component.html',
  styleUrls: ['./comparative-plot.component.scss']
})
export class ComparativePlotComponent implements OnInit {
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
    this.graph.data = this.theGraph.data[1];
    this.graph.layout = this.theGraph.layout;
    console.log(this.inputGraph);
    //let val = `Level ${this.selectedLevel + 1}`;
  }

  changeLevel(event: MatRadioChange): void {
    this.graph.data = this.theGraph.data[this.selectedLevel];
    console.log('Selected level:', this.selectedLevel+1);
    this.cdr.detectChanges();
  }
}

