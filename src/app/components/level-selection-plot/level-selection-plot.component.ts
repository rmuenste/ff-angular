import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatLegacyRadioChange as MatRadioChange } from '@angular/material/legacy-radio';

@Component({
  selector: 'app-level-selection-plot',
  templateUrl: './level-selection-plot.component.html',
  styleUrls: ['./level-selection-plot.component.scss']
})
export class LevelSelectionPlotComponent implements OnInit {
  @Input() inputGraph: any;

  selectedLevel: number = 0;
  currentData: any[] = [];
  layout: any = {};
  levels: any[] = [];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.inputGraph) {
      this.levels = this.inputGraph.data || [];
      this.layout = this.inputGraph.layout || {};
      this.updateCurrentData();
    }
  }

  private updateCurrentData(): void {
    if (this.levels.length > 0) {
      this.currentData = this.levels[this.selectedLevel] || [];
    }
  }

  changeLevel(event: MatRadioChange): void {
    this.selectedLevel = event.value;
    this.updateCurrentData();
    this.cdr.detectChanges();
  }
}