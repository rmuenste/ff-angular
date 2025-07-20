import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatLegacyCheckboxChange as MatCheckboxChange } from '@angular/material/legacy-checkbox';
import { MatLegacyRadioChange as MatRadioChange } from '@angular/material/legacy-radio';

@Component({
  selector: 'app-filterable-plot',
  templateUrl: './filterable-plot.component.html',
  styleUrls: ['./filterable-plot.component.scss']
})
export class FilterablePlotComponent implements OnInit {
  @Input() graph: any;

  selectedLevel: number = 0;
  showTimeStepG1: boolean[] = [true, true, true, true];
  currentData: any[] = [];
  layout: any = {};
  originalGraph: any = {};
  numLevels: number = 0;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.graph) {
      this.originalGraph = JSON.parse(JSON.stringify(this.graph));
      this.layout = this.originalGraph.layout || {};
      this.numLevels = this.graph.data?.length || 0;
      this.updateCurrentData();
    }
  }

  private updateCurrentData(): void {
    if (!this.originalGraph.data || !this.originalGraph.data[this.selectedLevel]) {
      return;
    }

    const levelData = this.originalGraph.data[this.selectedLevel];
    this.currentData = [];

    if (this.layout.title?.text !== "Bubble Size Plot") {
      // Standard filtering logic
      for (let i = 0; i < this.showTimeStepG1.length; i++) {
        if (this.showTimeStepG1[i] && levelData[i]) {
          this.currentData.push(levelData[i]);
        }
      }
    } else {
      // Special handling for Bubble Size Plot
      for (let i = 0; i < this.showTimeStepG1.length; i++) {
        if (this.showTimeStepG1[i]) {
          if (levelData[2 * i]) {
            this.currentData.push(levelData[2 * i]);
          }
          if (levelData[2 * i + 1]) {
            this.currentData.push(levelData[2 * i + 1]);
          }
        }
      }
    }
  }

  onFilterChange(event: MatCheckboxChange): void {
    this.updateCurrentData();
    this.cdr.detectChanges();
  }

  changeLevel(event: MatRadioChange): void {
    this.selectedLevel = event.value;
    // Reset all checkboxes to true when changing levels
    for (let i = 0; i < this.showTimeStepG1.length; i++) {
      this.showTimeStepG1[i] = true;
    }
    this.updateCurrentData();
    this.cdr.detectChanges();
  }
}