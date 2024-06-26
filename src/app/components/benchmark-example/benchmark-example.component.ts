import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

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
  graphData: any[] = [];
  graphLayout: any = {title: 'Line Chart'
  }
  graphcomData: any[] = [];
  graphcomLayout: any = {title: 'Line Chart'
  }

  graphBubbleMassData: any[] = [];
  graphbubbleMassLayout: any = {title: 'Line Chart'
  }

  graphRiseVelocityData: any[] = [];
  graphRiseVelocityLayout: any = {title: 'Line Chart'
  }

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
        //=====================================================================================
    // Assign the data of the circularity plot
    //=====================================================================================
    const {data: plotData, layout: plotLayout} = this.dataService.getBubble2circularityData();
    this.graphData = plotData;
    this.graphLayout = plotLayout;
    //console.log(`Plot data length: ${JSON.stringify(this.chartSpherecityData)}`)

      // Assign the data of the circularity plot
    //=====================================================================================
    const {data: comData, layout: comLayout} = this.dataService.getBubble2comData();
    this.graphcomData = comData;
    this.graphcomLayout = comLayout;
    //console.log(`Plot data length: ${JSON.stringify(this.chartSpherecityData)}`)

        // Assign the data of the circularity plot
    //=====================================================================================
    const {data: bubble2MassData, layout: bubble2MassLayout} = this.dataService.getBubble2MassData();
    this.graphBubbleMassData = bubble2MassData;
    this.graphbubbleMassLayout = bubble2MassLayout;
    //console.log(`Plot data length: ${JSON.stringify(this.chartSpherecityData)}`)

        // Assign the data of the circularity plot
    //=====================================================================================
    const {data: riseVelocityData, layout: riseVelocityLayout} = this.dataService.getBubble2VelocityData();
    this.graphRiseVelocityData = riseVelocityData;
    this.graphRiseVelocityLayout = riseVelocityLayout;
    //console.log(`Plot data length: ${JSON.stringify(this.chartSpherecityData)}`)

  }

}
