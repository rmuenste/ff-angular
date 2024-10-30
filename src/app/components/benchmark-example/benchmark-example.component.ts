import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PostService } from 'src/services/post.service'; 
import { PeriodicElement, Notation, Reference, benchFormat, 
         ReferenceBubbleS, ELEMENT_DATA, NOTATION_DATA, 
         REFERENCE_DATA, BENCHMARK_FORMAT, REFERENCE_BubbleS
         } from './benchmark-interfaces';

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

  //case 2 data
  graphBubble2ShapeData2: any[] = [];
  graphBubble2Shapelayout2: any = {title: 'Line Chart'
  }


  selectedCase: number = 1;
  case1Data: string = 'Data for Case 1';
  case2Data: string = 'Data for Case 2';

  posts: any[] = [];

  constructor(private dataService: DataService, private postService: PostService) {

  }


  ngOnInit(): void {
    //=====================================================================================
    // Assign the data of the circularity plot
    //=====================================================================================
    const {data: plotData, layout: plotLayout} = this.dataService.get_case1_bubble_circularity_2d();
    this.graphData = plotData;
    this.graphLayout = plotLayout;
    this.graphCircularityPack = {data: this.graphData, layout: this.graphLayout};


    //=====================================================================================
    const {data: comData, layout: comLayout} = this.dataService.get_case1_bubble_com_2d();
    this.graphcomData = comData;
    this.graphcomLayout = comLayout;
    this.graphcomPack = {data: this.graphcomData, layout: this.graphcomLayout};

    //=====================================================================================
    const {data: riseVelocityData, layout: riseVelocityLayout} = this.dataService.get_case1_bubble_vel_2d();
    this.graphRiseVelocityData = riseVelocityData;
    this.graphRiseVelocityLayout = riseVelocityLayout;
    this.graphRiseVelocityPack = {data: this.graphRiseVelocityData, layout: this.graphRiseVelocityLayout};

    // Bubble Shape Data
    //=====================================================================================
    const {data: c1g1l4shape_data, layout: c1g1l4shape_Layout} = this.dataService.get_case1_bubble_shape_2d();
    this.graphBubble2ShapeData = c1g1l4shape_data;
    this.graphBubble2Shapelayout = c1g1l4shape_Layout;

    //=====================================================================================
    const {data: c1g1l4_bubbleMass_data, layout: c1g1l4_bubbleMass_Layout} = this.dataService.get_case1_bubble_mass_2d();
    this.graphBubble2MassData = c1g1l4_bubbleMass_data;
    this.graphBubble2Masslayout = c1g1l4_bubbleMass_Layout;
    this.graphMassPack = {data: this.graphBubble2MassData, layout: this.graphBubble2Masslayout};

  };

  loadSelection(userCase: number) {
    console.log(userCase);

    if (userCase == 1){
      this.loadCase1Data();
    } 
    else if (userCase == 2){
      this.loadCase2Data()
    }
  };
  loadCase1Data() {
    this.case1Data = 'Data for Case 1 has been loaded.';
    //=====================================================================================
    // Assign the data of the circularity plot
    //=====================================================================================
    const {data: plotData, layout: plotLayout} = this.dataService.get_case1_bubble_circularity_2d();
    this.graphData = plotData;
    this.graphLayout = plotLayout;
    this.graphCircularityPack = {data: this.graphData, layout: this.graphLayout};


    //=====================================================================================
    const {data: comData, layout: comLayout} = this.dataService.get_case1_bubble_com_2d();
    this.graphcomData = comData;
    this.graphcomLayout = comLayout;
    this.graphcomPack = {data: this.graphcomData, layout: this.graphcomLayout};

    //=====================================================================================
    const {data: riseVelocityData, layout: riseVelocityLayout} = this.dataService.get_case1_bubble_vel_2d();
    this.graphRiseVelocityData = riseVelocityData;
    this.graphRiseVelocityLayout = riseVelocityLayout;
    this.graphRiseVelocityPack = {data: this.graphRiseVelocityData, layout: this.graphRiseVelocityLayout};

    // Bubble Shape Data
    //=====================================================================================
    const {data: c1g1l4shape_data, layout: c1g1l4shape_Layout} = this.dataService.get_case1_bubble_shape_2d();
    this.graphBubble2ShapeData = c1g1l4shape_data;
    this.graphBubble2Shapelayout = c1g1l4shape_Layout;

    //=====================================================================================
    const {data: c1g1l4_bubbleMass_data, layout: c1g1l4_bubbleMass_Layout} = this.dataService.get_case1_bubble_mass_2d();
    this.graphBubble2MassData = c1g1l4_bubbleMass_data;
    this.graphBubble2Masslayout = c1g1l4_bubbleMass_Layout;
    this.graphMassPack = {data: this.graphBubble2MassData, layout: this.graphBubble2Masslayout};
  }

  loadCase2Data() {


    this.case2Data = 'Data for Case 2 has been loaded.';
    console.log(`Level 2 data loaded`);
    //=====================================================================================
    // Assign the data of the circularity plot
    //=====================================================================================
    const {data: plotData, layout: plotLayout} = this.dataService.get_case1_bubble_circularity_2d();
    this.graphData = plotData;
    this.graphLayout = plotLayout;
    this.graphCircularityPack = {data: this.graphData, layout: this.graphLayout};


    //=====================================================================================
    const {data: comData, layout: comLayout} = this.dataService.get_case1_bubble_com_2d();
    this.graphcomData = comData;
    this.graphcomLayout = comLayout;
    this.graphcomPack = {data: this.graphcomData, layout: this.graphcomLayout};

    //=====================================================================================
    const {data: riseVelocityData, layout: riseVelocityLayout} = this.dataService.get_case1_bubble_vel_2d();
    this.graphRiseVelocityData = riseVelocityData;
    this.graphRiseVelocityLayout = riseVelocityLayout;
    this.graphRiseVelocityPack = {data: this.graphRiseVelocityData, layout: this.graphRiseVelocityLayout};

    //=====================================================================================
    const {data: c1g1l4_bubbleMass_data, layout: c1g1l4_bubbleMass_Layout} = this.dataService.get_case1_bubble_mass_2d();
    this.graphBubble2MassData = c1g1l4_bubbleMass_data;
    this.graphBubble2Masslayout = c1g1l4_bubbleMass_Layout;
    this.graphMassPack = {data: this.graphBubble2MassData, layout: this.graphBubble2Masslayout};

    //case 2 data
      // Bubble Shape Data
    //=====================================================================================
//    this.postService.postFileRequest("bubble_shape_case2").subscribe(
//    {
//        next: (data) => {
//          //this.posts = data; // Handle emitted data
//          //console.log('Server response:', data);
//          jsonData = data;
//        },
//        error: (error) => {
//          console.error('Error fetching posts:', error); // Handle error
//        },
//        complete: () => {
//          console.log('Observable completed'); // Handle completion if needed
//        },
//    });

    const {data: c2g3l4s_data, layout: c2g3l4s_Layout} = this.dataService.get_case2_bubble_shape_2d();
    this.graphBubble2ShapeData = c2g3l4s_data;
    this.graphBubble2Shapelayout = c2g3l4s_Layout;

  }

}
