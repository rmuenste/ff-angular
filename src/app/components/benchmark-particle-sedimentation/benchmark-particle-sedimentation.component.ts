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

  displayedColumnsSedimentation = ['case', 'rho_f', 'mu_f', 'Re', 'St'];
  dataSourceSedimentation = [
  { case: 'E1', rho_f: 970, mu_f: 373, Re: 1.5, St: 0.19 },
  { case: 'E2', rho_f: 965, mu_f: 212, Re: 4.1, St: 0.53 },
  { case: 'E3', rho_f: 962, mu_f: 113, Re: 11.6, St: 1.50 },
  { case: 'E4', rho_f: 960, mu_f: 58, Re: 31.9, St: 4.13 },
];

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

  dataSourceE1 = [
    { resolution: 'L2', velocity: 'assets/sedimentation/velE1.txt', position: 'assets/sedimentation/posE1.txt' },
    { resolution: 'L3', velocity: 'assets/sedimentation/velE1_L3.txt', position: 'assets/sedimentation/posE1_L3.txt' },
  ];

  dataSourceE2 = [
    { resolution: 'L2', velocity: 'assets/sedimentation/velE2.txt', position: 'assets/sedimentation/posE2.txt' },
    { resolution: 'L3', velocity: 'assets/sedimentation/velE2_L3.txt', position: 'assets/sedimentation/posE2_L3.txt' },
  ];

  dataSourceE3 = [
    { resolution: 'L2', velocity: 'assets/sedimentation/velE3.txt', position: 'assets/sedimentation/posE3.txt' },
    { resolution: 'L3', velocity: 'assets/sedimentation/velE3_L3.txt', position: 'assets/sedimentation/posE3_L3.txt' },
  ];

  dataSourceE4 = [
    { resolution: 'L2', velocity: 'assets/sedimentation/velE4.txt', position: 'assets/sedimentation/posE4.txt' },
    { resolution: 'L3', velocity: 'assets/sedimentation/velE4_L3.txt', position: 'assets/sedimentation/posE4_L3.txt' },
  ];

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