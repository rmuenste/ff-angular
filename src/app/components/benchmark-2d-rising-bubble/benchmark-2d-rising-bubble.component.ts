import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PostService } from '../../services/post.service'; 
import { PeriodicElement, Notation, Reference, benchFormat,
         ReferenceBubbleS, ELEMENT_DATA, NOTATION_DATA,
         REFERENCE_DATA, BENCHMARK_FORMAT, REFERENCE_BubbleS
         } from './benchmark-2d-rising-bubble-interfaces';
import { BenchmarkPlotService } from '../../services/benchmark-plot.service';

@Component({
  selector: 'app-benchmark-2d-rising-bubble',
  templateUrl: './benchmark-2d-rising-bubble.component.html',
  styleUrls: ['./benchmark-2d-rising-bubble.component.scss']
})
export class Benchmark2DRisingBubbleComponent implements OnInit {

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

  graphCircularityPack: {} |  null = null;
  graphData: any[] = [];
  graphLayout: any = {title: 'Line Chart'
  }

  graphComPack: {} | null = null;
  graphcomData: any[] = [];
  graphcomLayout: any = {title: 'Line Chart'
  }

  graphRiseVelocityPack: {} | null = null;
  graphRiseVelocityData: any[] = [];
  graphRiseVelocityLayout: any = {title: 'Line Chart'
  }

  graphMassPack: {} | null = null;
  graphBubbleMassData: any[] = [];
  graphbubbleMassLayout: any = {title: 'Line Chart'
  }

  graphCase2ShapePack: {} | null = null;
  graphBubble2ShapeData: any[] = [];
  graphBubble2Shapelayout: any = {title: 'Line Chart'
  }

  graphCase1ShapePack: {} | null = null;
  graphBubble2ShapeData11: any[] = [];
  graphBubble2Shapelayout11: any = {title: 'Line Chart'
  }

  graphBubble2MassData: any[] = []; 
  graphBubble2Masslayout: any = {title: 'Line Chart' 
  }

  //case 2 data
  graphBubble2ShapeData2: any[] = [];
  graphBubble2Shapelayout2: any = {title: 'Line Chart'
  }

  graph2ComPack: {} | null = null;

  graphCase2CircularityPack: {} | null = null;
  graphCase2Data: any[] = [];
  graphCase2Layout: any = {title: 'Line Chart'
  }

  graphCase2RiseVelocityPack: {} | null = null;

  graphCase2MassPack: {} | null = null;



  selectedCase: number = 1;
  case1Data: string = 'Data for Case 1';
  case2Data: string = 'Data for Case 2';

  constructor(
    private dataService: DataService, 
    private postService: PostService,
    private benchmarkPlotService: BenchmarkPlotService
  ) {

  }


  ngOnInit(): void {
    this.loadCase1Data();
  };

  //case button is handled here
  loadSelection(userCase: number) {

    if (userCase == 1){
      this.loadCase1Data();
    } 
    else if (userCase == 2){
      this.loadCase2Data()
    }
  };

  async loadCase1Data() {
    this.case1Data = 'Data for Case 1 has been loaded.';

    try {
      const plotData = await this.benchmarkPlotService.getCase1PlotData();

      // Assign shape data
      this.graphBubble2ShapeData = plotData.shapePack.data[0];
      this.graphBubble2Shapelayout = plotData.shapePack.layout;
      this.graphCase1ShapePack = plotData.shapePack;

      // Assign circularity data
      this.graphData = plotData.circularityPack.data;
      this.graphLayout = plotData.circularityPack.layout;
      this.graphCircularityPack = plotData.circularityPack;

      // Assign COM data
      this.graphComPack = plotData.comPack;

      // Assign rise velocity data
      this.graphRiseVelocityPack = plotData.riseVelocityPack;

      // Assign mass data
      this.graphMassPack = plotData.massPack;

    } catch (error: any) {
      console.log("Got error: ", error);
    }
  }



  //handles case 2 data
  async loadCase2Data() {
    this.case2Data = 'Data for Case 2 has been loaded.';

    try {
      const start = Date.now();
      const plotData = await this.benchmarkPlotService.getCase2PlotData();
      const end = Date.now();
      console.log(`Async load time: ${end - start} ms`);

      // Assign shape data
      this.graphBubble2ShapeData = plotData.shapePack.data[0];
      this.graphBubble2Shapelayout = plotData.shapePack.layout;
      this.graphCase2ShapePack = plotData.shapePack;

      // Assign circularity data
      this.graphCase2Data = plotData.circularityPack.data;
      this.graphCase2Layout = plotData.circularityPack.layout;
      this.graphCase2CircularityPack = plotData.circularityPack;

      // Assign COM data
      this.graph2ComPack = plotData.comPack;

      // Assign rise velocity data
      this.graphCase2RiseVelocityPack = plotData.riseVelocityPack;

      // Assign mass data
      this.graphCase2MassPack = plotData.massPack;

    } catch (error) {
      console.log("Got error: ", error);
    }
  }



}
