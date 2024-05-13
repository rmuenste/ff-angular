import { Injectable } from '@angular/core';
import { sphericityL1, massConservationL2, dataSizeL2, sphericityL2, sphericityL3 } from '../components/benchmark-bubble3/data';
import { BenchmarkData, exampleBenchmarkData  } from '../models/benchmark-data';

const graph2 = {
  data: [
    { x: [1, 2, 3, 4, 5], y: [1, 4, 9, 4, 1], type: 'scatter' },
    { x: [1, 2, 3, 4, 5], y: [1, 3, 6, 9, 6], type: 'scatter' },
    { x: [1, 2, 3, 4, 5], y: [1, 2, 4, 5, 6], type: 'scatter' },
  ],
  layout: {title: 'Some Data to Highlight'}
};

//=====================================================================================
// Here we have the data of the mesh table
//=====================================================================================
export interface MeshTable {
  lvl: number;
  mx: number;
  my: number;
  mz: number;
  nx: number;
  ny: number;
  nz: number;
  nel: number;
  nq2: number;
  tdof: number;
}

const MESH_DATA: MeshTable[] = [
  {lvl: 1, mx: 16, my: 16, mz: 32, nx: 8, ny: 8, nz: 16, nel: 2048, nq2: 18785, tdof: 83332},
  {lvl: 2, mx: 32, my: 32, mz: 64, nx: 16, ny: 16, nz: 32, nel: 16384, nq2: 140481, tdof: 627460},
  {lvl: 3, mx: 64, my: 64, mz: 128, nx: 32, ny: 32, nz: 64, nel: 131072, nq2: 1085825, tdof: 4867588},
  {lvl: 4, mx: 128, my: 128, mz: 128, nx: 64, ny: 64, nz: 256, nel: 1048576, nq2: 8536833, tdof: 38341636},
];
const displayedColumnsMeshTable: string[] = ['lvl', 'mx', 'my', 'mz', 'nx', 'ny', 'nz', 'nel', 'nq2', 'tdof'];
//=====================================================================================


//=====================================================================================
// Here we have the data of the physical parameters
//=====================================================================================
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
];

const displayedColumnsPhysical: string[] = ['position', 'p1', 'p2', 'mu1', 'mu2', 'g', 'sigma', 're', 'eo', 'rel', 'relmu'];
//=====================================================================================



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  //=====================================================================================
  // Here we have the data of the sphericity plot
  //=====================================================================================
  getPlotData() {
  //const chartSpherecityData = [...sphericityL1.data, sphericityL2.data, sphericityL3.data];

  const chartSpherecityData = [sphericityL1.data, sphericityL2.data, sphericityL3.data];

//  console.log(`We got ${chartSpherecityData.length} data sets`);
//  for(let i = 0; i < chartSpherecityData.length; i++) {
//    console.log(`Data set ${i}: ${JSON.stringify(chartSpherecityData[i])}`);
//  }
  return {
    data: chartSpherecityData,
      layout: {
        title: {
          text: 'Sphericity Plot',
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
          showgrid: true,
          tickfont: {
            color: '#ffffffb3'
          },
          gridcolor: '#505050',
          title: {
            text: 'Time[s]',
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
            text: 'Sphericity',
            font: {
              color: '#ffffffb3'
            }
          }
        }
      }
    };

  }
  //=====================================================================================


  //=====================================================================================
  // Here we have the data of the mass conservation plot
  //=====================================================================================
  getMassPlotData() {
  const chartMassConservationData = [...massConservationL2.data];
  return {
    data: chartMassConservationData,
    layout: {title: {
              text: 'Mass Conservation Plot',
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
              showgrid: true,
              tickfont: {
                color: '#ffffffb3'
              },
              gridcolor: '#505050',
              title: {
                text: 'Time[s]',
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
                text: 'Mass Conservation',
                font: {
                  color: '#ffffffb3'
                }
              }
             }
            }
  };
  }

  //=====================================================================================
  // Here we have the data of the mass conservation plot
  //=====================================================================================
  getSizePlotData() {
  const chartSizeData = [...dataSizeL2.data];
  return {
    data: chartSizeData,
    layout: {title: {
              text: 'Bubble Size Plot',
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
              showgrid: true,
              tickfont: {
                color: '#ffffffb3'
              },
              gridcolor: '#505050',
              title: {
                text: 'Time[s]',
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
                text: 'Bubble Size',
                font: {
                  color: '#ffffffb3'
                }
              }
             }
            }
  };
  }

  //=====================================================================================
  // Here we have the data of the 3d bubble benchmark mesh table
  //=====================================================================================
  getMeshTableData() {
    return {
             meshData: MESH_DATA,
             displayColumns: displayedColumnsMeshTable
           }
  }
  //=====================================================================================


  //=====================================================================================
  // Here we have the data of the 3d bubble benchmark mesh table
  //=====================================================================================
  getPhysicalDataTable() {
    return {
             meshData: ELEMENT_DATA,
             displayColumns: displayedColumnsPhysical
           }
  }

  //=====================================================================================
  // The function to get the benchmarkData for the generalBenchmark template
  //=====================================================================================
  getBenchmarkData(benchmarkId: number) : BenchmarkData {
    return exampleBenchmarkData[benchmarkId];
  }

}
