import { Injectable, Inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { IDataService } from './interfaces/data-service.interface';
import { DATA_SERVICE_TOKEN } from './data-service.factory';
import { DataService } from './data.service';
import { BenchmarkFiles } from '../benchmark-data.constants';

export interface PlotData {
  data: any[];
  layout: any;
}

export interface ShapeData {
  data: any[];
  layout: any;
}

export interface Case1PlotData {
  circularityPack: PlotData;
  comPack: PlotData;
  riseVelocityPack: PlotData;
  massPack: PlotData;
  shapePack: { data: any[][]; layout: any };
}

export interface Case2PlotData {
  circularityPack: PlotData;
  comPack: PlotData;
  riseVelocityPack: PlotData;
  massPack: PlotData;
  shapePack: { data: any[][]; layout: any };
}

@Injectable({
  providedIn: 'root'
})
export class BenchmarkPlotService {

  constructor(
    @Inject(DATA_SERVICE_TOKEN) private apiDataService: IDataService,
    private dataService: DataService
  ) { }

  async getCase1PlotData(): Promise<Case1PlotData> {
    const observable$ = this.apiDataService.getViewData('benchmark-case1');
    const dataMap = await firstValueFrom(observable$);

    // Process shape data
    const shapePack = this.processCase1ShapeData(dataMap);

    // Process circularity data
    const circularityPack = this.processCase1CircularityData(dataMap);

    // Process COM data
    const comPack = this.processCase1ComData(dataMap);

    // Process rise velocity data
    const riseVelocityPack = this.processCase1RiseVelocityData(dataMap);

    // Process mass data
    const massPack = this.processCase1MassData(dataMap);

    return {
      circularityPack,
      comPack,
      riseVelocityPack,
      massPack,
      shapePack
    };
  }

  async getCase2PlotData(): Promise<Case2PlotData> {
    const observable$ = this.apiDataService.getViewData('benchmark-case2');
    const dataMap = await firstValueFrom(observable$);

    // Process shape data
    const shapePack = this.processCase2ShapeData(dataMap);

    // Process circularity data
    const circularityPack = this.processCase2CircularityData(dataMap);

    // Process COM data
    const comPack = this.processCase2ComData(dataMap);

    // Process rise velocity data
    const riseVelocityPack = this.processCase2RiseVelocityData(dataMap);

    // Process mass data
    const massPack = this.processCase2MassData(dataMap);

    return {
      circularityPack,
      comPack,
      riseVelocityPack,
      massPack,
      shapePack
    };
  }

  private processCase1ShapeData(dataMap: any): { data: any[][]; layout: any } {
    const {data: d0, layout: l0} = this.processData(dataMap[BenchmarkFiles.C1_G1_L5_SHAPE]);
    const {data: dc1g2l1s} = this.processData(dataMap[BenchmarkFiles.C1_G2_L1_SHAPE]);
    const {data: d2} = this.processData(dataMap[BenchmarkFiles.C1_G3_SHAPE], "dot", 8);
    const {data: dc1g1l6s} = this.processData(dataMap[BenchmarkFiles.C1_G1_L6_SHAPE]);
    const {data: d1} = this.processData(dataMap[BenchmarkFiles.C1_G2_L2_SHAPE]);
    const {data: dc1g2l3s} = this.processData(dataMap[BenchmarkFiles.C1_G2_L2_SHAPE]);

    let dL1 = [...dc1g1l6s];
    let dL2 = [...dc1g1l6s];

    // Level 1 data
    d0.push(...dc1g2l1s);
    d0.push(...d2);

    // Level 2 data
    dL1.push(...d1);
    dL1.push(...d2);

    // Level 3 data
    dL2.push(...dc1g2l3s);
    dL2.push(...d2);

    return { data: [d0, dL1, dL2], layout: l0 };
  }

  private processCase2ShapeData(dataMap: any): { data: any[][]; layout: any } {
    const {data: d0, layout: l0} = this.processData(dataMap[BenchmarkFiles.C2_G1_L6_SHAPE]); 
    const {data: dc2g2l1s} = this.processData(dataMap[BenchmarkFiles.C2_G2_L1_SHAPE]);      
    const {data: d2} = this.processData(dataMap[BenchmarkFiles.C2_G3_L4_SHAPE], "dot", 8);  
    const {data: dcffL1} = this.processData(dataMap[BenchmarkFiles.DOWN_BUBBLE_SHAPE_L1]);

    const {data: dc2g1l7s} = this.processData(dataMap[BenchmarkFiles.C2_G1_L7_SHAPE]);     
    const {data: d1} = this.processData(dataMap[BenchmarkFiles.C2_G2_L2_SHAPE]);            
    const {data: dcffL2} = this.processData(dataMap[BenchmarkFiles.DOWN_BUBBLE_SHAPE_L2]);

    const {data: dc2g1l8s} = this.processData(dataMap[BenchmarkFiles.C2_G1_L8_SHAPE]);      
    const {data: dc2g2l3s} = this.processData(dataMap[BenchmarkFiles.C2_G2_L3_SHAPE]);      
    const {data: dcffL3} = this.processData(dataMap[BenchmarkFiles.DOWN_BUBBLE_SHAPE_L3]);

    let dL1 = [...dc2g1l7s];
    let dL2 = [...dc2g1l8s];

    // Level 1 data
    d0.push(...dc2g2l1s);
    d0.push(...dcffL1);
    d0.push(...d2);

    // Level 2 data
    dL1.push(...d1);
    dL1.push(...dcffL2);
    dL1.push(...d2);

    // Level 3 data
    dL2.push(...dc2g2l3s);
    dL2.push(...dcffL3);
    dL2.push(...d2);

    return { data: [d0, dL1, dL2], layout: l0 };
  }

  private processCase1CircularityData(dataMap: any): PlotData {
    const {data: plotData, layout: plotLayout} = this.dataService.getcircularityData(
      dataMap[BenchmarkFiles.C1_G1_L1_CIRC],
      dataMap[BenchmarkFiles.C1_G2_L1_CIRC],
      dataMap[BenchmarkFiles.C1_G3_L1_CIRC],
      dataMap[BenchmarkFiles.C1_G1_L2_CIRC],
      dataMap[BenchmarkFiles.C1_G2_L2_CIRC],
      dataMap[BenchmarkFiles.C1_G3_L2_CIRC],
      dataMap[BenchmarkFiles.C1_G1_L3_CIRC],
      dataMap[BenchmarkFiles.C1_G2_L3_CIRC],
      dataMap[BenchmarkFiles.C1_G3_L3_CIRC],
    );

    return { data: plotData, layout: plotLayout };
  }

  private processCase1ComData(dataMap: any): PlotData {
    const {data: comData, layout: comLayout} = this.dataService.getcomData(
      dataMap[BenchmarkFiles.C1_G1_L1_COM],
      dataMap[BenchmarkFiles.C1_G2_L1_COM],
      dataMap[BenchmarkFiles.C1_G3_L1_COM],
      dataMap[BenchmarkFiles.C1_G1_L2_COM],
      dataMap[BenchmarkFiles.C1_G2_L2_COM],
      dataMap[BenchmarkFiles.C1_G3_L2_COM],
      dataMap[BenchmarkFiles.C1_G1_L3_COM],
      dataMap[BenchmarkFiles.C1_G2_L3_COM],
      dataMap[BenchmarkFiles.C1_G3_L3_COM],
    );

    return { data: comData, layout: comLayout };
  }

  private processCase1RiseVelocityData(dataMap: any): PlotData {
    const {data: riseVelocityData, layout: riseVelocityLayout} = this.dataService.getriseVelocityData(
      dataMap[BenchmarkFiles.C1_G1_L1_RISE_VELOCITY],
      dataMap[BenchmarkFiles.C1_G2_L1_RISE_VELOCITY],
      dataMap[BenchmarkFiles.C1_G3_L1_RISE_VELOCITY],
      dataMap[BenchmarkFiles.C1_G1_L2_RISE_VELOCITY],
      dataMap[BenchmarkFiles.C1_G2_L2_RISE_VELOCITY],
      dataMap[BenchmarkFiles.C1_G3_L2_RISE_VELOCITY],
      dataMap[BenchmarkFiles.C1_G1_L3_RISE_VELOCITY],
      dataMap[BenchmarkFiles.C1_G2_L3_RISE_VELOCITY],
      dataMap[BenchmarkFiles.C1_G3_L3_RISE_VELOCITY],
    );

    return { data: riseVelocityData, layout: riseVelocityLayout };
  }

  private processCase1MassData(dataMap: any): PlotData {
    const {data: MassData, layout: MassLayout} = this.dataService.getmassData(
      dataMap[BenchmarkFiles.C1_G1_L1_MASS],
      dataMap[BenchmarkFiles.C1_G2_L1_MASS],
      dataMap[BenchmarkFiles.C1_G3_L1_MASS],
      dataMap[BenchmarkFiles.C1_G1_L2_MASS],
      dataMap[BenchmarkFiles.C1_G2_L2_MASS],
      dataMap[BenchmarkFiles.C1_G3_L2_MASS],
      dataMap[BenchmarkFiles.C1_G1_L3_MASS],
      dataMap[BenchmarkFiles.C1_G2_L3_MASS],
      dataMap[BenchmarkFiles.C1_G3_L3_MASS],
    );

    return { data: MassData, layout: MassLayout };
  }

  private processCase2CircularityData(dataMap: any): PlotData {
    const {data: plotData, layout: plotLayout} = this.dataService.getCase2Bubble2circularityData(
      dataMap[BenchmarkFiles.C2_G1_L4_CIRC],
      dataMap[BenchmarkFiles.C2_G2_L1_CIRC],
      dataMap[BenchmarkFiles.C2_G3_L2_CIRC],
      dataMap[BenchmarkFiles.C2_G1_L5_CIRC],
      dataMap[BenchmarkFiles.C2_G2_L2_CIRC],
      dataMap[BenchmarkFiles.C2_G3_L3_CIRC],
      dataMap[BenchmarkFiles.C2_G1_L6_CIRC],
      dataMap[BenchmarkFiles.C2_G2_L3_CIRC],
      dataMap[BenchmarkFiles.C2_G3_L4_CIRC],
      dataMap[BenchmarkFiles.FF_CIRCULARITY_L1],
      dataMap[BenchmarkFiles.FF_CIRCULARITY_L2],
      dataMap[BenchmarkFiles.FF_CIRCULARITY_L3]
    );

    return { data: plotData, layout: plotLayout };
  }

  private processCase2ComData(dataMap: any): PlotData {
    const {data: comData, layout: comLayout} = this.dataService.getCase2Bubble2comData(
      dataMap[BenchmarkFiles.C2_G1_L4_COM],
      dataMap[BenchmarkFiles.C2_G2_L1_COM],
      dataMap[BenchmarkFiles.C2_G3_L2_COM],
      dataMap[BenchmarkFiles.C2_G1_L5_COM],
      dataMap[BenchmarkFiles.C2_G2_L2_COM],
      dataMap[BenchmarkFiles.C2_G3_L3_COM],
      dataMap[BenchmarkFiles.C2_G1_L6_COM],
      dataMap[BenchmarkFiles.C2_G2_L3_COM],
      dataMap[BenchmarkFiles.C2_G3_L4_COM],
    );

    return { data: comData, layout: comLayout };
  }

  private processCase2RiseVelocityData(dataMap: any): PlotData {
    const {data: riseVelocityData, layout: riseVelocityLayout} = this.dataService.getCase2Bubble2VelocityData(
      dataMap[BenchmarkFiles.C2_G1_L4_RISE_VEL],
      dataMap[BenchmarkFiles.C2_G2_L1_RISE_VEL],
      dataMap[BenchmarkFiles.C2_G3_L2_RISE_VEL],
      dataMap[BenchmarkFiles.C2_G1_L5_RISE_VEL],
      dataMap[BenchmarkFiles.C2_G2_L2_RISE_VEL],
      dataMap[BenchmarkFiles.C2_G3_L3_RISE_VEL],
      dataMap[BenchmarkFiles.C2_G1_L6_RISE_VEL],
      dataMap[BenchmarkFiles.C2_G2_L3_RISE_VEL],
      dataMap[BenchmarkFiles.C2_G3_L3_RISE_VEL]
    );

    return { data: riseVelocityData, layout: riseVelocityLayout };
  }

  private processCase2MassData(dataMap: any): PlotData {
    const {data: bubbleMass_data, layout: bubbleMass_Layout} = this.dataService.getCase2Bubble2MassData(
      dataMap[BenchmarkFiles.C2_G1_L4_BUBBLE_MASS],
      dataMap[BenchmarkFiles.C2_G2_L1_BUBBLE_MASS],
      dataMap[BenchmarkFiles.C2_G3_L2_BUBBLE_MASS],
      dataMap[BenchmarkFiles.C2_G1_L5_BUBBLE_MASS],
      dataMap[BenchmarkFiles.C2_G2_L2_BUBBLE_MASS],
      dataMap[BenchmarkFiles.C2_G3_L3_BUBBLE_MASS],
      dataMap[BenchmarkFiles.C2_G1_L6_BUBBLE_MASS],
      dataMap[BenchmarkFiles.C2_G2_L3_BUBBLE_MASS],
      dataMap[BenchmarkFiles.C2_G3_L3_BUBBLE_MASS],
      dataMap[BenchmarkFiles.FF_BUBBLE_MASS_L1],
      dataMap[BenchmarkFiles.FF_BUBBLE_MASS_L2],
      dataMap[BenchmarkFiles.FF_BUBBLE_MASS_L3]
    );

    return { data: bubbleMass_data, layout: bubbleMass_Layout };
  }

  private processData(dataFile: any, style?: string, sMax: number = 2) {
    let nSegments = dataFile.x.length / 2;
    const plotData = [];

    if (sMax !== undefined) {
      nSegments = dataFile.x.length / sMax;
    }

    for (let i = 0; i < nSegments; i++) {
      const segmentX = dataFile.x.slice(sMax * i, sMax * (i + 1));
      const segmentY = dataFile.y.slice(sMax * i, sMax * (i + 1));

      if (i === 0) {
        if (style !== undefined) {
          plotData.push({
            x: segmentX,
            y: segmentY,
            type: 'scatter',
            mode: 'lines',
            line: { color: dataFile.marker.color, dash: style },
            name: dataFile.name,
            showlegend: true,
          });
        } else {
          plotData.push({
            x: segmentX,
            y: segmentY,
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
            x: segmentX,
            y: segmentY,
            type: 'scatter',
            mode: 'lines',
            line: { color: dataFile.marker.color, dash: style },
            name: dataFile.name,
            showlegend: false,
          });
        } else {
          plotData.push({
            x: segmentX,
            y: segmentY,
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