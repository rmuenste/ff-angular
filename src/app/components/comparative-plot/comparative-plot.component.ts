import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

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
    console.log(this.inputGraph)
  }

}

