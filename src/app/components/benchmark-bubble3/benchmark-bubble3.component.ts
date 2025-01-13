import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { multi } from './data';
import { bubble, sphericityL1, massConservationL2 } from './data';
import { DataService, MeshTable, PeriodicElement } from 'src/app/services/data.service';
import { PostService } from 'src/services/post.service'; 
import { firstValueFrom } from 'rxjs';


export interface FileDownload {
  file: string;
  action: string;
  fileURL: string;
}
const fileData: FileDownload[] = [
  {file: "sphericity.json", action: "Download", fileURL : "assets/files/bubble3/sphericity.json"},
  {file: "mass_conservation.json", action: "Download", fileURL : "assets/files/bubble3/mass_conservation.json"},
  {file: "size.json", action: "Download", fileURL : "assets/files/bubble3/size.json"},
  {file: "surface.json", action: "Download", fileURL : "assets/files/bubble3/surface.json"}
];

@Component({
  selector: 'app-benchmark-bubble3',
  templateUrl: './benchmark-bubble3.component.html',
  styleUrls: ['./benchmark-bubble3.component.scss']
})
export class BenchmarkBubble3Component implements OnInit {
  displayedColumnsFiles: string[] = ['file', 'action'];
  dataSourceFiles = fileData;
  //=============================================================================
  // Line chart
  chartSpherecityData : any[] = [];
  graph3: {} | null = null;
  
  //=============================================================================

  //=============================================================================
  // Line chart
  chartMassData : any[] = [];
  graphMassConservation : {} | null = null

  //=============================================================================

  //=============================================================================
  // Line chart
  chartSizeData : any[] = [];
  graphSize : any = {};
  //=============================================================================

  //=============================================================================
  // Line chart
  chartSurfaceData : any[] = [];
  graphSurface : any = {};
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

  data: any;

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
  selectedLevel: string = 'Level 2';



  constructor(private dataService: DataService, private postService: PostService) {

  }

 
  async loadData () {

    try {
      const observable$ = this.postService.postMultiFileRequest([
                                                                  "RB3sphericityL1", "RB3sphericityL2", "RB3sphericityL3",
                                                                  "RB3bubble_massL1", "RB3bubble_massL2", "RB3bubble_massL3"
                                                                ])

      this.data = await firstValueFrom(observable$);
      const {data: plotData, layout: plotLayout} = this.dataService.get_bubble_sphericity_3d(
        this.data[0],
        this.data[1],
        this.data[2],
      );
      this.graph3 ={data: plotData, layout: plotLayout};

      //=====================================================================================
      // Assign the data of the mass conservation plot
      //=====================================================================================
      const {data: massData, layout: massLayout} = this.dataService.get_bubble_mass_3d(
        this.data[3],
        this.data[4],
        this.data[5]
      );
      this.chartMassData = massData;
      this.graphMassConservation = {data: massData, layout: massLayout};

    }

   catch (error) {
    console.log("Got error: ", error);
  }

  }


  
  ngOnInit(): void {

    this.loadData();



    //=====================================================================================
    // Assign the data of the sphericity plot
    //=====================================================================================
    /*
    const {data: plotData, layout: plotLayout} = this.dataService.get_bubble_sphericity_3d();
    this.chartSpherecityData = plotData
    //console.log(`Plot data length: ${JSON.stringify(this.chartSpherecityData)}`)

    //this.graph3 = JSON.parse(JSON.stringify(this.graph));
    this.graph3.data = this.chartSpherecityData;
    this.graph3.layout = plotLayout;
    */
    //=====================================================================================
    // Assign the data of the mass conservation plot
    //=====================================================================================
    //const {data: massData, layout: massLayout} = this.dataService.get_bubble_mass_3d();
    //this.chartMassData = massData;
    //this.graphMassConservation.data = this.chartMassData;
    //this.graphMassConservation.layout = massLayout;

    //=====================================================================================
    // Assign the data of the bubble size plot
    //=====================================================================================
    const {data: sizeData, layout: sizeLayout} = this.dataService.get_bubble_size_3d();
    this.chartSizeData = sizeData;
    this.graphSize.data = this.chartSizeData;
    this.graphSize.layout = sizeLayout;

    //=====================================================================================
    // Assign the data of the surface data plot
    //=====================================================================================
    const {data: surfaceData, layout: surfaceLayout} = this.dataService.get_bubble_surface_3d();
    this.chartSurfaceData = surfaceData;
    this.graphSurface.data = this.chartSurfaceData;
    this.graphSurface.layout = surfaceLayout;

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

  changeLevel(event: MatRadioChange): void {
    console.log("We got ", event.value);
  }


  filterSphericityData(): void {
    // Make it so that the color of a particular dataSet with index i
    // stays the same.
    this.chartSpherecityData.splice(0, this.chartSpherecityData.length);
    for(let i = 0; i < this.showTimeStepG1.length; i++) {
      if(this.showTimeStepG1[i]) {
        this.chartSpherecityData.push(sphericityL1.data[i]);
      }
    }
  }
}

