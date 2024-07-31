import { Injectable } from '@angular/core';
import { sphericityL1, massConservationL2, massConservationL3, massConservationL4, sphericityL2, sphericityL3 } from '../components/benchmark-bubble3/data';
import { dataSizeL2, dataSizeL3, dataSizeL4 } from '../components/benchmark-bubble3/data';
import { surfaceDataL2, surfaceDataL3, surfaceDataL4 } from '../components/benchmark-bubble3/data';
import { circularity, comData, massData, riseVelocityData, c1g2l1_COM_data, c1g2l1_circularity_data, c1g2l1_velocity_data, c1g3l1_COM_data, c1g3l1_Circularity_data, c1g3l1_Velocity_data, c1g3l1_com_data, c1g1l4s_data } from '../components/benchmark-example/data_bubble2';

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

  const chartMassConservationData = [massConservationL2.data, massConservationL3.data, massConservationL4.data];
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
  const chartSizeData = [dataSizeL2.data, dataSizeL3.data, dataSizeL4.data];
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
  // Here we have the data of the surface plot
  //=====================================================================================
  getSurfaceData() {
  const chartSurface = [surfaceDataL2.data, surfaceDataL3.data, surfaceDataL4.data];
  return {
    data: chartSurface,
    layout: {title: {
              text: 'Bubble Surface Plot',
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
              range: [-1.5, 1.5], // Define custom x-axis limits
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
              range: [-0.5, 1.3], // Define custom y-axis limits
              showgrid: true,
              tickfont: {
                color: '#ffffffb3'
              },
              gridcolor: '#505050',
              title: {
                text: 'Bubble Surface',
                font: {
                  color: '#ffffffb3'
                }
              }
             },
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
  };

  getBubble2circularityData() {

    const markerTraceTP2D = {
      x: circularity.x.filter((_, index) => index % 90 === 0),
      y: circularity.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const markerTraceFreeLIFE = {
      x: c1g2l1_circularity_data.x.filter((_, index) => index % 20 === 0),
      y: c1g2l1_circularity_data.y.filter((_, index) => index % 20 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };
    
    const markerTraceMooNMD = {
      x: c1g3l1_Circularity_data.x.filter((_, index) => index % 60 === 0),
      y: c1g3l1_Circularity_data.y.filter((_, index) => index % 60 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };
    
    //const bubble2Shape_data = [circularity];
  
    const bubble2circularityDatadata = [circularity, c1g2l1_circularity_data,c1g3l1_Circularity_data, markerTraceTP2D, markerTraceFreeLIFE, markerTraceMooNMD];
  
  //  console.log(`We got ${chartSpherecityData.length} data sets`);
  //  for(let i = 0; i < chartSpherecityData.length; i++) {
  //    console.log(`Data set ${i}: ${JSON.stringify(chartSpherecityData[i])}`);
  //  }
    return {
      data: bubble2circularityDatadata,
        layout: {
          title: {
            text: 'Circularity',
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
              text: 'Circularity',
              font: {
                color: '#ffffffb3'
              }
            }
          }
        }
    }
  };

  getBubble2comData() {
    //const bubble2Shape_data = [bubbleShape];
  
    const markerTraceTP2D = {
      x: comData.x.filter((_, index) => index % 90 === 0),
      y: comData.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const markerTraceFreeLIFE = {
      x: c1g2l1_COM_data.x.filter((_, index) => index % 20 === 0),
      y: c1g2l1_COM_data.y.filter((_, index) => index % 20 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };
    
    const markerTraceMooNMD = {
      x: c1g2l1_COM_data.x.filter((_, index) => index % 20 === 0),
      y: c1g2l1_COM_data.y.filter((_, index) => index % 20 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };

  
    const bubble2com_data = [comData, markerTraceTP2D,
                             c1g2l1_COM_data, markerTraceFreeLIFE,
                            c1g3l1_com_data, markerTraceMooNMD];

  
  //  console.log(`We got ${chartSpherecityData.length} data sets`);
  //  for(let i = 0; i < chartSpherecityData.length; i++) {
  //    console.log(`Data set ${i}: ${JSON.stringify(chartSpherecityData[i])}`);
  //  }
    return {
      data: bubble2com_data,
        layout: {
          title: {
            text: 'Center of Mass',
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
              text: 'Center of Mass',
              font: {
                color: '#ffffffb3'
              }
            }
          }
        }
    }
  };

  getBubble2MassData() {
    //const bubble2Shape_data = [bubbleShape];
  
    const bubble2Mass_data = [massData];
  
  //  console.log(`We got ${chartSpherecityData.length} data sets`);
  //  for(let i = 0; i < chartSpherecityData.length; i++) {
  //    console.log(`Data set ${i}: ${JSON.stringify(chartSpherecityData[i])}`);
  //  }
    return {
      data: bubble2Mass_data,
        layout: {
          title: {
            text: 'Bubble Mass/Area',
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
              text: 'Center of Mass',
              font: {
                color: '#ffffffb3'
              }
            },
            range: [99, 101],  // Adding the range property here
            tickvals: [99, 100, 101]  // Specifying the tick values
          }
        }
    }
  };

  getBubble2VelocityData() {
    //const bubble2Velocity_data = [];

    const markerTraceTP2D = {
      x: riseVelocityData.x.filter((_, index) => index % 90 === 0),
      y: riseVelocityData.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const markerTraceFreeLIFE = {
      x: c1g2l1_velocity_data.x.filter((_, index) => index % 20 === 0),
      y: c1g2l1_velocity_data.y.filter((_, index) => index % 20 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };
  
    const markerTraceMooNMD = {
      x: c1g3l1_Velocity_data.x.filter((_, index) => index % 60 === 0),
      y: c1g3l1_Velocity_data.y.filter((_, index) => index % 60 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };

    const bubble2Velocity_data = [riseVelocityData, c1g2l1_velocity_data, c1g3l1_Velocity_data, markerTraceTP2D, markerTraceFreeLIFE, markerTraceMooNMD];
  
  //  console.log(`We got ${chartSpherecityData.length} data sets`);
  //  for(let i = 0; i < chartSpherecityData.length; i++) {
  //    console.log(`Data set ${i}: ${JSON.stringify(chartSpherecityData[i])}`);
  //  }
    return {
      data: bubble2Velocity_data,
        layout: {
          title: {
            text: 'Rise Velocity',
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
            range: [0.0, 3.0], // Define custom x-axis limits
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
              text: 'Center of Mass',
              font: {
                color: '#ffffffb3'
              }
            }
          }
        }
    }
  };


  getBubble2Shape_data() {

    const nSegments = c1g1l4s_data.x.length / 2;
    const plotData = [];

    for (let i = 0; i < nSegments; i++) {
      const segmentX = c1g1l4s_data.x.slice(2 * i, 2 * (i + 1));
      const segmentY = c1g1l4s_data.y.slice(2 * i, 2 * (i + 1));


      plotData.push({
        x: segmentX,
        y: segmentY,
        type: 'scatter',
        mode: 'lines',
        line: { color: 'blue' },
        showlegend: false
      });
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
    };
  }
}