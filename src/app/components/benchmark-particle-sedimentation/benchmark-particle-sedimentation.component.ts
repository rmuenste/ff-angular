import { Component, OnInit } from '@angular/core';

export interface ReferenceElement {
  column: number;
  quantity: string;
}

export interface FileDownload {
  file: string;
  action: string;
}

const referenceData: ReferenceElement[] = [
  {column: 1, quantity: "Time"},
  {column: 2, quantity: "Velocity"},
  {column: 3, quantity: "Position"},
  {column: 4, quantity: "Drag Force"},
];

const fileData: FileDownload[] = [
  {file: "ParticleSedimentationData.txt", action: "Download"},
];

@Component({
  selector: 'app-benchmark-particle-sedimentation',
  templateUrl: './benchmark-particle-sedimentation.component.html',
  styleUrls: ['./benchmark-particle-sedimentation.component.scss']
})
export class BenchmarkParticleSedimentationComponent implements OnInit {

  displayedColumnsRefData: string[] = ['column', 'quantity'];
  dataSourceRefData = referenceData;

  displayedColumnsFiles: string[] = ['file', 'action'];
  dataSourceFiles = fileData;

  view: [number, number] = [700, 300];

  mathEq = `When $ a \\ne 0 $`;

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}