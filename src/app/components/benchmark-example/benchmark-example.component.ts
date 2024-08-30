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

export interface benchFormat{
  Column: string,
  Quantity: string
}

export interface ReferenceBubbleS{
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
  {file: 'All in one zip file', action: 'Download', fileURL: "assets/files/bubble2/quantities.zip"},
  /*
  {file: 'c1g1l4.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c1g1l4.txt"},
  {file: 'c1g1l5.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c1g1l5.txt"},
  {file: 'c1g1l6.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c1g1l6.txt"},
  {file: 'c1g1l7.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c1g1l7.txt"},
  {file: 'c1g2l1.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c1g2l1.txt"},
  {file: 'c1g2l2.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c1g2l2.txt"},
  {file: 'c1g2l3.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c1g2l3.txt"},
  {file: 'c1g3l1.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c1g3l1.txt"},
  {file: 'c1g3l2.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c1g3l2.txt"},
  {file: 'c1g3l3.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c1g3l3.txt"},
  {file: 'c1g3l4.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c1g3l4.txt"},
  {file: 'c2g1l4.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c2g1l4.txt"},
  {file: 'c2g1l5.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c2g1l5.txt"},
  {file: 'c2g1l6.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c2g1l6.txt"},
  {file: 'c2g1l7.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c2g1l7.txt"},
  {file: 'c2g1l8.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c2g1l8.txt"},
  {file: 'c2g2l1.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c2g2l1.txt"},
  {file: 'c2g2l2.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c2g2l2.txt"},
  {file: 'c2g2l3.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c2g2l3.txt"},
  {file: 'c2g3l2.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c2g3l2.txt"},
  {file: 'c2g3l3.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c2g3l3.txt"},
  {file: 'c2g3l4.txt', action: 'Download', fileURL : "assets/files/bubble2/quantities/c2g3l4.txt"},
  */
  ];

const BENCHMARK_FORMAT: benchFormat[] = [
  {Column: '1',  Quantity: 'Time'},
  {Column: '2',  Quantity: 'Bubble Mass or Area'},
  {Column: '3',  Quantity: 'Circularity'},
  {Column: '4',  Quantity: 'Center of Mass (y-coordinate)'},
  {Column: '5',  Quantity: 'Rise Velocity'},

  ];

const REFERENCE_BubbleS: ReferenceBubbleS[] = [
  {file: 'All in one zip file', action: 'Download', fileURL : "assets/files/bubble2/shapes.zip"},
  /*
  {file: 'c1g1l4s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c1g1l4s.txt"},
  {file: 'c1g1l5s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c1g1l5s.txt"},
  {file: 'c1g1l6s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c1g1l6s.txt"},
  {file: 'c1g1l7s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c1g1l7s.txt"},
  {file: 'c1g2l1s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c1g2l1s.txt"},
  {file: 'c1g2l2s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c1g2l2s.txt"},
  {file: 'c1g2l3s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c1g2l3s.txt"},
  {file: 'c1g3l4s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c1g3l4s.txt"},
  {file: 'c2g1l4s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c2g1l4s.txt"},
  {file: 'c2g1l5s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c2g1l5s.txt"},
  {file: 'c2g1l6s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c2g1l6s.txt"},
  {file: 'c2g1l7s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c2g1l7s.txt"},
  {file: 'c2g1l8s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c2g1l8s.txt"},
  {file: 'c2g2l1s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c2g2l1s.txt"},
  {file: 'c2g2l2s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c2g2l2s.txt"},
  {file: 'c2g2l3s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c2g2l3s.txt"},
  {file: 'c2g3l4s.txt', action: 'Download', fileURL : "assets/files/bubble2/shape/c2g3l4s.txt"},
  */
  ];


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
  
  displayedBenchFormat: string[] = ['Column', 'Quantity'];
  dataSource_B = BENCHMARK_FORMAT;
  
  displayedReferenceBubbleS: string[] = ['file', 'action'];
  dataSourceBubbleS = REFERENCE_BubbleS;
  

  mathEq = `When $ a \\ne 0 $`;

  graphCircularityPack: {} = {};
  graphData: any[] = [];
  graphLayout: any = {title: 'Line Chart'
  }

  graphcomPack: {} = {};
  graphcomData: any[] = [];
  graphcomLayout: any = {title: 'Line Chart'
  }

  graphRiseVelocityPack: {} = {};
  graphRiseVelocityData: any[] = [];
  graphRiseVelocityLayout: any = {title: 'Line Chart'
  }

  graphMassPack: {} = {};
  graphBubbleMassData: any[] = [];
  graphbubbleMassLayout: any = {title: 'Line Chart'
  }

  graphBubble2ShapeData: any[] = [];
  graphBubble2Shapelayout: any = {title: 'Line Chart'
  }

  graphBubble2MassData: any[] = []; 
  graphBubble2Masslayout: any = {title: 'Line Chart' 
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
    this.graphCircularityPack = {data: this.graphData, layout: this.graphLayout};


    //=====================================================================================
    const {data: comData, layout: comLayout} = this.dataService.getBubble2comData();
    this.graphcomData = comData;
    this.graphcomLayout = comLayout;
    this.graphcomPack = {data: this.graphcomData, layout: this.graphcomLayout};

    //=====================================================================================
    const {data: riseVelocityData, layout: riseVelocityLayout} = this.dataService.getBubble2VelocityData();
    this.graphRiseVelocityData = riseVelocityData;
    this.graphRiseVelocityLayout = riseVelocityLayout;
    this.graphRiseVelocityPack = {data: this.graphRiseVelocityData, layout: this.graphRiseVelocityLayout};

    // Bubble Shape Data
    //=====================================================================================
    const {data: c1g1l4shape_data, layout: c1g1l4shape_Layout} = this.dataService.getBubble2Shape_data();
    this.graphBubble2ShapeData = c1g1l4shape_data;
    this.graphBubble2Shapelayout = c1g1l4shape_Layout;

    //=====================================================================================
    const {data: c1g1l4_bubbleMass_data, layout: c1g1l4_bubbleMass_Layout} = this.dataService.getBubble2MassDataN();
    this.graphBubble2MassData = c1g1l4_bubbleMass_data;
    this.graphBubble2Masslayout = c1g1l4_bubbleMass_Layout;
    this.graphMassPack = {data: this.graphBubble2MassData, layout: this.graphBubble2Masslayout};



  }

}
