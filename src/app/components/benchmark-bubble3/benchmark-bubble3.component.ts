import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { multi } from './data';
import { bubble, dt_1, massConservationL2 } from './data';
import { DataService, MeshTable, PeriodicElement } from 'src/app/services/data.service';



@Component({
  selector: 'app-benchmark-bubble3',
  templateUrl: './benchmark-bubble3.component.html',
  styleUrls: ['./benchmark-bubble3.component.scss']
})

export class BenchmarkBubble3Component implements OnInit {

  //=============================================================================
  // Line chart
  chartSpherecityData : any[] = [];
  graph3 : any = {};
  //=============================================================================

  //=============================================================================
  // Line chart
  chartMassData : any[] = [];
  graphMassConservation : any = {};
  //=============================================================================


  //=============================================================================
  // Mesh Table
  displayedColumnsMesh: string[] = [];
  dataSourceMesh : MeshTable[] = [];
  //=============================================================================


  //=============================================================================
  // Physical Parameters Table
  displayedColumnsPhysical: string[] = [];
  dataSource: PeriodicElement[] = [];
  //=============================================================================


  //=============================================================================

  mathEq = `When $ a \\ne 0 $`;

  lineData = bubble;
  view: [number, number] = [700, 700];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time[s]';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  autoScale: boolean = true;

  showTimeStepG1: boolean[] = [true, true, true, true];


  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {

    //=====================================================================================
    // Assign the data of the sphericity plot
    //=====================================================================================
    const {data: plotData, layout: plotLayout} = this.dataService.getPlotData();
    this.chartSpherecityData = plotData
    this.graph3.data = this.chartSpherecityData;
    this.graph3.layout = plotLayout;

    //=====================================================================================
    // Assign the data of the mass conservation plot
    //=====================================================================================
    const {data: massData, layout: massLayout} = this.dataService.getMassPlotData();
    this.chartMassData = massData;
    this.graphMassConservation.data = this.chartMassData;
    this.graphMassConservation.layout = massLayout;

    //=====================================================================================
    // Assign the data of the bubble size plot
    //=====================================================================================

    //=====================================================================================
    // Assign the data of the surface data plot
    //=====================================================================================


    let meshTableData = this.dataService.getMeshTableData();
    this.dataSourceMesh = meshTableData.meshData;
    this.displayedColumnsMesh = meshTableData.displayColumns;

    let physicsTableData = this.dataService.getPhysicalDataTable();
    this.dataSource = physicsTableData.meshData;
    this.displayedColumnsPhysical = physicsTableData.displayColumns;
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

  g3change(ob: MatCheckboxChange): void {
    let idx: number = parseInt(ob.source.id);
    //this.showTimeStepG1[idx] = ob.checked;
    console.log(`We got ${ob.checked} from source: ${ob.source.id}`);
    // Next we manipulate the input date by filtering
    this.filterSphericityData();
  }

  filterSphericityData(): void {
    // Make it so that the color of a particular dataSet with index i
    // stays the same.
    this.chartSpherecityData.splice(0, this.chartSpherecityData.length);
    for(let i = 0; i < this.showTimeStepG1.length; i++) {
      if(this.showTimeStepG1[i]) {
        this.chartSpherecityData.push(dt_1.data[i]);
      }
    }
  }

}

