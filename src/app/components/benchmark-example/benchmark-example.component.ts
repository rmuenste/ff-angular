import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PostService } from 'src/services/post.service'; 
import { PeriodicElement, Notation, Reference, benchFormat, 
         ReferenceBubbleS, ELEMENT_DATA, NOTATION_DATA, 
         REFERENCE_DATA, BENCHMARK_FORMAT, REFERENCE_BubbleS
         } from './benchmark-interfaces';
import { firstValueFrom } from 'rxjs';

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

  data: any;


  selectedCase: number = 1;
  case1Data: string = 'Data for Case 1';
  case11Data: string = 'Data for Case 1';
  case2Data: string = 'Data for Case 2';

  constructor(private dataService: DataService, private postService: PostService) {

  }


  ngOnInit(): void {
    this.loadCase11Data();
    return;
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
    this.graphComPack = {data: this.graphcomData, layout: this.graphcomLayout};

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

  //case button is handled here
  loadSelection(userCase: number) {
    console.log(userCase);

    if (userCase == 1){
      this.loadCase11Data();
    } 
    else if (userCase == 2){
      this.loadCase2Data()
    }
  };

  async loadCase11Data () {


    this.case11Data = 'Data for Case 11 has been loaded.';
    console.log(`Level 11 data loaded`);

    try {
      const observable$ = this.postService.postMultiFileRequest(["c1g1l1_circularity", "c1g2l1_circularity", "c1g3l1_circularity",
                                                                 "c1g1l2_circularity", "c1g2l2_circularity", "c1g3l2_circularity", 
                                                                 "c1g1l3_circularity", "c1g2l3_circularity", "c1g3l3_circularity",
                                                                 "c1g1l1_com", "c1g2l1_com", "c1g3l1_com",
                                                                 "c1g1l2_com", "c1g2l2_com", "c1g3l2_com",
                                                                 "c1g1l3_com", "c1g2l3_com", "c1g3l3_com",
                                                                 "c1g1l1_rise_velocity", "c1g2l1_rise_velocity", "c1g3l1_rise_velocity",
                                                                 "c1g1l2_rise_velocity", "c1g2l2_rise_velocity", "c1g3l2_rise_velocity",
                                                                 "c1g1l3_rise_velocity", "c1g2l3_rise_velocity", "c1g3l3_rise_velocity",
                                                                 "c1g1l1_mass", "c1g2l1_mass", "c1g3l1_mass",
                                                                 "c1g1l2_mass", "c1g2l2_mass", "c1g3l2_mass",
                                                                 "c1g1l3_mass", "c1g2l3_mass", "c1g3l3_mass",
                                                                 "c1g1l5s", "c1g2s", "c1g3s" ])

                                                              
      this.data = await firstValueFrom(observable$);
      const {data: d0, layout: l0} = this.processData(this.data[36]);
      const {data: d1} = this.processData(this.data[37]);
      const {data: d2} = this.processData(this.data[38])

      //append d1 and d2 to d0
      d0.push(...d1);
      d0.push(...d2);

      this.graphBubble2ShapeData = d0;
      this.graphBubble2Shapelayout = l0;
    


      //=====================================================================================
      // Assign the data of the circularity plot
      //=====================================================================================
      const {data: plotData, layout: plotLayout} = this.dataService.getcircularityData(
        this.data[0],
        this.data[1],
        this.data[2],
        this.data[3],
        this.data[4],
        this.data[5],
        this.data[6],
        this.data[7],
        this.data[8],
      );

      this.graphData = plotData;
      this.graphLayout = plotLayout; 
      this.graphCircularityPack = {data: plotData, layout: plotLayout};


      //=====================================================================================
      // Assign the data of the com plot
      //=====================================================================================
      const {data: comData, layout: comLayout} = this.dataService.getcomData(
        this.data[9],
        this.data[10],
        this.data[11],
        this.data[12],
        this.data[13],
        this.data[14],
        this.data[15],
        this.data[16],
        this.data[17],
      );

    this.graphComPack = {data: comData, layout: comLayout};


      //=====================================================================================
      // Assign the data of the rise velocity plot
      //=====================================================================================
      const {data: riseVelocityData, layout: riseVelocityLayout} = this.dataService.getriseVelocityData(
        this.data[18],
        this.data[19],
        this.data[20],
        this.data[21],
        this.data[22],
        this.data[23],
        this.data[24],
        this.data[25],
        this.data[26],
      );

    this.graphRiseVelocityPack = {data: riseVelocityData, layout: riseVelocityLayout};


      //=====================================================================================
      // Assign the data of the Bubble Mass plot
      //=====================================================================================
      const {data: MassData, layout: MassLayout} = this.dataService.getmassData(
        this.data[27],
        this.data[28],
        this.data[29],
        this.data[30],
        this.data[31],
        this.data[32],
        this.data[33],
        this.data[34],
        this.data[35],
      );

    this.graphMassPack = {data: MassData, layout: MassLayout};

    } 
      
      catch (error: any) {
        console.log("Got error: ", error);
      }
  };



    //handles case 2 data
  async loadCase2Data() {


    this.case2Data = 'Data for Case 2 has been loaded.';
    console.log(`Level 2 data loaded`);


    //case 2 data
    // Bubble Shape Data
    //=====================================================================================
    try {
      const observable$ = this.postService.postMultiFileRequest(["c2g1l8s", "c2g2l2s", "c2g3l4s",
                                                                 "c2g1l4_circularity", "c2g1l5_circularity", "c2g1l6_circularity",
                                                                 "c2g2l1_circularity", "c2g2l2_circularity", "c2g2l3_circularity",
                                                                 "c2g3l2_circularity", "c2g3l3_circularity", "c2g3l4_circularity",
                                                                 "c2g1l4_com", "c2g1l5_com", "c2g1l6_com",
                                                                 "c2g2l1_com", "c2g2l2_com", "c2g2l3_com",
                                                                 "c2g3l2_com", "c2g3l3_com", "c2g3l4_com", //riseVel
                                                                 "c2g1l4_rise_vel", "c2g1l5_rise_vel", "c2g1l6_rise_vel",
                                                                 "c2g2l1_rise_vel", "c2g2l2_rise_vel", "c2g2l3_rise_vel",
                                                                 "c2g3l2_rise_vel", "c2g3l3_rise_vel", "c2g3l3_rise_vel", //bubble_mass
                                                                 "c2g1l4_bubble_mass", "c2g1l5_bubble_mass", "c2g1l6_bubble_mass",
                                                                 "c2g2l1_bubble_mass", "c2g2l2_bubble_mass", "c2g2l3_bubble_mass",
                                                                 "c2g3l2_bubble_mass", "c2g3l3_bubble_mass", "c2g3l3_bubble_mass", //featflower
                                                                 "ff_circularityL1", "ff_circularityL2", "ff_circularityL3",
                                                                 "ff_bubbleMassL1", "ff_bubbleMassL2", "ff_bubbleMassL3",
                                                                 "c2g1l6s", "c2g2l1s", "c2g1l7s", "c2g2l3s",
                                                                 "ff_bubbleShapeL1", "ff_bubbleShapeL2", "ff_bubbleShapeL3" 
                                                                ])



      this.data = await firstValueFrom(observable$);
      //const {data: d0, layout: l0} = this.processData(this.data[0]);
      const {data: d0, layout: l0} = this.processData(this.data[45]); // c2g1l6s
      const {data: dc2g2l1s} = this.processData(this.data[46]);       // c2g2l1s
      const {data: d2} = this.processData(this.data[2], "dot", 8);              // c2g3l4s
      const {data: dcffL1} = this.data[49];              // 

      const {data: dc2g1l7s} = this.processData(this.data[47]);       // c2g1l7s
      const {data: d1} = this.processData(this.data[1]);              // c2g2l2s
      const {data: dcffL2} = this.data[50];              // 



      const {data: dc2g1l8s} = this.processData(this.data[0]);        // c2g1l8s
      const {data: dc2g2l3s} = this.processData(this.data[48]);       // c2g2l3s
      const {data: dcffL3} = this.data[51];              // 



      let d0_orig = [...d0];
      let dL1 = [...dc2g1l7s];
      let dL2 = [...dc2g1l8s];

      //append d1 and d2 to d0
      d0.push(...dc2g2l1s);
      d0.push(...d2);
      //d0.push(...[dcffL1]);

      // append level2 for g2 and g3
      dL1.push(...d1);
      dL1.push(...d2);
      //dL1.push(...[dcffL2]);

      // append level3 for g2 and g3
      dL2.push(...dc2g2l3s);
      dL2.push(...d2);
      //dL2.push(...[dcffL3]);

      this.graphBubble2ShapeData = d0;
      this.graphBubble2Shapelayout = l0;
      this.graphCase2ShapePack = {data: [d0, dL1, dL2], layout: l0};
      console.log(this.data.length)
      

      //=====================================================================================
      // Assign the data of the circularity plot
      //=====================================================================================
      const {data: plotData, layout: plotLayout} = this.dataService.getCase2Bubble2circularityData(
        this.data[3],
        this.data[6],
        this.data[9],
        this.data[4],
        this.data[7],
        this.data[10],
        this.data[5],
        this.data[8],
        this.data[11],
        this.data[39],
        this.data[40],
        this.data[41]
      );

      this.graphCase2Data = plotData;
      this.graphCase2Layout = plotLayout; 
      this.graphCase2CircularityPack = {data: this.graphCase2Data, layout: this.graphCase2Layout};

      //=====================================================================================
      // Assign the data of the com plot
      //=====================================================================================
      const {data: comData, layout: comLayout} = this.dataService.getCase2Bubble2comData(
          this.data[12],
          this.data[15],
          this.data[18],
          this.data[13],
          this.data[16],
          this.data[19],
          this.data[14],
          this.data[17],
          this.data[20],
        );

      this.graph2ComPack = {data: comData, layout: comLayout};

      //=====================================================================================
      // Assign the data of the rise velocity plot
      //=====================================================================================
      const {data: riseVelocityData, layout: riseVelocityLayout} = this.dataService.getCase2Bubble2VelocityData(
          this.data[21],
          this.data[24],
          this.data[27],
          this.data[22],
          this.data[25],
          this.data[28],
          this.data[23],
          this.data[26],
          this.data[29]
      );
      this.graphCase2RiseVelocityPack = {data: riseVelocityData, layout: riseVelocityLayout};

    const {data: bubbleMass_data, layout: bubbleMass_Layout} = this.dataService.getCase2Bubble2MassData(
          this.data[30],
          this.data[33],
          this.data[36],
          this.data[31],
          this.data[34],
          this.data[37],
          this.data[32],
          this.data[35],
          this.data[38],
          this.data[42],
          this.data[43],
          this.data[44]
    );
    this.graphCase2MassPack = {data: bubbleMass_data, layout: bubbleMass_Layout};
    console.log("MassPack: ", this.graphCase2MassPack);

    } catch (error) {
      console.log("Got error: ", error);
    }

  }


  // First, define the type for the style parameter
  // type LineStyle = "solid" | "dot" | "dash" | "longdash" | "dashdot" | "longdashdot";
  processData(dataFile : any, style?: string, s_max: number = 2) {

    //  x: c1g1l1_mass_data.x.filter((_, index) => index % 90 === 0),
    //  y: c1g1l1_mass_data.y.filter((_, index) => index % 90 === 0),

    let nSegments = dataFile.x.length / 2;
    const plotData = [];

    if (s_max !== undefined) {
      // s_max was provided
      nSegments = dataFile.x.length / s_max;
    }


    for (let i = 0; i < nSegments; i++) {
      const segmentX = [dataFile.x.slice(s_max * i, s_max * (i + 1))];
      const segmentY = [dataFile.y.slice(s_max * i, s_max * (i + 1))];

      if (i === 0) {

        if (style !== undefined) {
          plotData.push({
            x: segmentX[0],
            y: segmentY[0],
            type: 'scatter',
            mode: 'lines',
            line: { color: dataFile.marker.color, dash: style },
            name: dataFile.name,
            showlegend: true,
          });
        } else {
          plotData.push({
            x: segmentX[0],
            y: segmentY[0],
            type: 'scatter',
            mode: 'lines',
            name: dataFile.name,
            line: { color: dataFile.marker.color},
            showlegend: true,
          });
        }

      } else {


        if (style !== undefined) {
          plotData.push({
            x: segmentX[0],
            y: segmentY[0],
            type: 'scatter',
            mode: 'lines',
            line: { color: dataFile.marker.color, dash: style },
            name: dataFile.name,
            showlegend: false,
          });
        } else {
          plotData.push({
            x: segmentX[0],
            y: segmentY[0],
            type: 'scatter',
            mode: 'lines',
            name: dataFile.name,
            line: { color: dataFile.marker.color},
            showlegend: false,
          });
        }

      }

    }

    return {
      data: plotData,
      layout: {
        title: {
          text: 'Bubble Shape',
          font: {
            color: '#ffffffb3'
          }
        },
        showlegend: true,
        legend: {
          font: {
            color: '#ffffffb3'
          }
        },
        plot_bgcolor: '#303030',
        paper_bgcolor: '#303030',
        xaxis: {
          range: [0.1, 0.9],
          showgrid: true,
          tickfont: {
            color: '#ffffffb3'
          },
          gridcolor: '#505050',
          title: {
            text: 'X-Coordinate',
            font: {
              color: '#ffffffb3'
            }
          }
        },
        yaxis: {
          showgrid: true,
          tickfont: {
            color: '#ffffffb3'
          },
          gridcolor: '#505050',
          title: {
            text: 'Y-Coordinate',
            font: {
              color: '#ffffffb3'
            }
          }
        }
      }
    }
  }

}
