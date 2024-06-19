import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  p1: number;
  position: number;
  p2: number;
  mu1: number;
  mu2: number;
  g: number;
  sigma: number;
  re: number;
  eo: number;
  rel: number;
  relmu: number;
}

export interface Notation{
  abbreviation: string;
  description: string;
}

export interface Reference{
  file: string;
  action: string;
  fileURL: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, p1: 1000, p2: 100, mu1: 10, mu2: 1, g: 0.98, sigma: 24.5, re: 35, eo: 10, rel: 10, relmu: 10},
  {position: 2, p1: 1000, p2: 1, mu1: 10, mu2: 0.1, g: 0.98, sigma: 1.96, re: 35, eo: 125, rel: 1000, relmu: 100},];

const NOTATION_DATA: Notation[] = [
  {abbreviation: 'c1', description: 'Test Case 1'},
  {abbreviation: 'c2', description: 'Test Case 2'},
  {abbreviation: 'g1', description: 'TU Dortmund (TP2D)'},
  {abbreviation: 'g2', description: 'EPFL Lausanne (FreeLIFE)'},
  {abbreviation: 'g3', description: 'Uni Magdebug (MooNMD)'},
  {abbreviation: 'l#', description: 'Grid Refinement Level (higher number means denser grid)'}
];

const REFERENCE_DATA: Reference[] = [
  {file: 'All in one zip file', action: 'Download', fileURL: "assets/files/bubble3/sphericity.json"},
  {file: 'c1g1l4.txt', action: 'Download', fileURL : "assets/files/bubble3/mass_conservation.json"},

]

@Component({
  selector: 'app-benchmark-example',
  templateUrl: './benchmark-example.component.html',
  styleUrls: ['./benchmark-example.component.scss']
})
export class BenchmarkExampleComponent implements OnInit {

  displayedColumns: string[] = ['position', 'p1', 'p2', 'mu1', 'mu2', 'g', 'sigma', 're', 'eo', 'rel', 'relmu'];
  dataSource = ELEMENT_DATA;

  displayedNotations: string[] = ['abbreviation', 'description'];
  dataSource_N = NOTATION_DATA;

  displayedReferences: string[] = ['file', 'action'];
  dataSource_R = REFERENCE_DATA;
  
  mathEq = `When $ a \\ne 0 $`;

  graphData: any[] = [
    { x: [1, 2, 3, 4], y: [10, 15, 13, 17], type: 'scatter', mode: 'lines+points', marker: { color: 'blue' } }
  ];

  graphLayout: any = { title: 'Line Chart' };

  constructor() { }

  ngOnInit(): void {
  }

}
