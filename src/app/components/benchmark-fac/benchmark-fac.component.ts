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

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, p1: 1000, p2: 100, mu1: 10, mu2: 1, g: 0.98, sigma: 24.5, re: 35, eo: 10, rel: 10, relmu: 10},
  {position: 2, p1: 1000, p2: 1, mu1: 10, mu2: 0.1, g: 0.98, sigma: 1.96, re: 35, eo: 125, rel: 1000, relmu: 100},
];

@Component({
  selector: 'app-benchmark-fac',
  templateUrl: './benchmark-fac.component.html',
  styleUrls: ['./benchmark-fac.component.scss']
})
export class BenchmarkFacComponent implements OnInit {

  displayedColumns: string[] = ['position', 'p1', 'p2', 'mu1', 'mu2', 'g', 'sigma', 're', 'eo', 'rel', 'relmu'];
  dataSource = ELEMENT_DATA;

  mathEq = `When $ a \\ne 0 $`;

  constructor() { }

  ngOnInit(): void {
  }

}
