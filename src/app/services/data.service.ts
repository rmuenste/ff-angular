import { Injectable } from '@angular/core';

  
import { PostService } from 'src/services/post.service';
import { MESH_DATA } from '../data/mesh-data';
import { ELEMENT_DATA } from '../data/element-data';


import { BenchmarkData, exampleBenchmarkData  } from '../models/benchmark-data';
import { PlotData } from '../components/benchmark-2d-rising-bubble/benchmark-2d-rising-bubble-interfaces';
import { PlotMarker } from 'plotly.js-dist-min';



const graph2 = {
  data: [
    { x: [1, 2, 3, 4, 5], y: [1, 4, 9, 4, 1], type: 'scatter' },
    { x: [1, 2, 3, 4, 5], y: [1, 3, 6, 9, 6], type: 'scatter' },
    { x: [1, 2, 3, 4, 5], y: [1, 2, 4, 5, 6], type: 'scatter' },
  ],
  layout: {title: 'Some Data to Highlight'}
};

//=====================================================================================
// Mesh table data imported from dedicated file
//=====================================================================================

const displayedColumnsMeshTable: string[] = ['lvl', 'mx', 'my', 'mz', 'nx', 'ny', 'nz', 'nel', 'nq2', 'tdof'];
//=====================================================================================


//=====================================================================================
// Physical parameter data imported from dedicated file
//=====================================================================================


const displayedColumnsPhysical: string[] = ['position', 'p1', 'p2', 'mu1', 'mu2', 'g', 'sigma', 're', 'eo', 'rel', 'relmu'];
//=====================================================================================



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private postService: PostService) { }

  //=====================================================================================
  // Here we have the data of the sphericity plot
  //=====================================================================================
  getBubbleSphericity3d(
    RB3sphericityL1In: PlotData[],
    RB3sphericityL2In: PlotData[],
    RB3sphericityL3In: PlotData[]
  ) {

  const RB3sphericityData = [RB3sphericityL1In, RB3sphericityL2In, RB3sphericityL3In]
  return {
    data: RB3sphericityData,
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
  // Here we have the data of the mass conservation plot (Bubble 3D)
  //=====================================================================================
  getBubbleMass3d(
    RB3bubble_massL1: PlotData[],
    RB3bubble_massL2: PlotData[],
    RB3bubble_massL3: PlotData[]
  ) {

  const chartMassConservationData = [RB3bubble_massL1, RB3bubble_massL2, RB3bubble_massL3];
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
  // Here we have the data of the size plot
  //=====================================================================================
  getBubbleSize3d(
    RB3sizeL1: PlotData[],
    RB3sizeL2: PlotData[],
    RB3sizeL3: PlotData[]
  ) {
    
  const chartSizeData = [RB3sizeL1, RB3sizeL2, RB3sizeL3];
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
  getBubbleSurface3d(
    RB3surfaceL1: PlotData[],
    RB3surfaceL2: PlotData[],
    RB3surfaceL3: PlotData[]
  ) {
  const chartSurface = [RB3surfaceL1, RB3surfaceL2, RB3surfaceL3];
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

  






    //=====================================================================================
  // Here we have the data of the circularity (Bubble 2D Case 1)
  //=====================================================================================
  getcircularityData(
        c1g1l1_circularityIn: PlotData,
        c1g2l1_circularityIn: PlotData,
        c1g3l1_circularityIn: PlotData,
        c1g1l2_circularityIn: PlotData,
        c1g2l2_circularityIn: PlotData,
        c1g3l2_circularityIn: PlotData,
        c1g1l3_circularityIn: PlotData,
        c1g2l3_circularityIn: PlotData,
        c1g3l3_circularityIn: PlotData) {

    const markerTraceTP2D = {
      x: c1g1l1_circularityIn.x.filter((_, index) => index % 300 === 0),
      y: c1g1l1_circularityIn.y.filter((_, index) => index % 300 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const markerTraceFreeLIFE = {
      x: c1g2l1_circularityIn.x.filter((_: any, index: any) => index % 50 === 0),
      y: c1g2l1_circularityIn.y.filter((_: any, index: any) => index % 50 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };


    const markerTraceMooNMD = {
      x: c1g3l1_circularityIn.x.filter((_: any, index: any) => index % 50 === 0),
      y: c1g3l1_circularityIn.y.filter((_: any, index: any) => index % 50 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };


    const marker2TraceTP2D = {
      x: c1g1l2_circularityIn.x.filter((_: any, index: any) => index % 90 === 0),
      y: c1g1l2_circularityIn.y.filter((_: any, index: any) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const marker2TraceFreeLIFE = {
      x: c1g2l2_circularityIn.x.filter((_: any, index: any) => index % 90 === 0),
      y: c1g2l2_circularityIn.y.filter((_: any, index: any) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };

    const marker2TraceMooNMD = {
      x: c1g3l2_circularityIn.x.filter((_: any, index: any) => index % 90 === 0),
      y: c1g3l2_circularityIn.y.filter((_: any, index: any) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };

    const marker3TraceTP2D = {
      x: c1g1l3_circularityIn.x.filter((_: any, index: any) => index % 300 === 0),
      y: c1g1l3_circularityIn.y.filter((_: any, index: any) => index % 300 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const marker3TraceFreeLIFE = {
      x: c1g2l3_circularityIn.x.filter((_: any, index: any) => index % 90 === 0),
      y: c1g2l3_circularityIn.y.filter((_: any, index: any) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };

 
    const marker3TraceMooNMD = {
      x: c1g3l3_circularityIn.x.filter((_: any, index: any) => index % 90 === 0),
      y: c1g3l3_circularityIn.y.filter((_: any, index: any) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };
    
    const case1bubble2Circularity_data = [
      [c1g1l1_circularityIn, markerTraceTP2D,
       c1g2l1_circularityIn,markerTraceFreeLIFE,
       c1g3l1_circularityIn,markerTraceMooNMD
      ],
      [c1g1l2_circularityIn, marker2TraceTP2D,
       c1g2l2_circularityIn, marker2TraceFreeLIFE,
       c1g3l2_circularityIn, marker2TraceMooNMD
      ],
      [c1g1l3_circularityIn,marker3TraceTP2D,
       c1g2l3_circularityIn,marker3TraceFreeLIFE,
       c1g3l3_circularityIn, marker3TraceMooNMD
       ]       
      ]

    return {
      data: case1bubble2Circularity_data,
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
              text: 'Circularity',
              font: {
                color: '#ffffffb3'
              }
            }
          }
        }
    }
  };


  //=====================================================================================
  // Here we have the data of the com (Bubble 2D Case 1)
  //=====================================================================================
  getcomData(
    c1g1l1_comIn: PlotData,
    c1g2l1_comIn: PlotData,
    c1g3l1_comIn: PlotData,
    c1g1l2_comIn: PlotData,
    c1g2l2_comIn: PlotData,
    c1g3l2_comIn: PlotData,
    c1g1l3_comIn: PlotData,
    c1g2l3_comIn: PlotData,
    c1g3l3_comIn: PlotData) {

const markerTraceTP2D = {
  x: c1g1l1_comIn.x.filter((_, index) => index % 100 === 0),
  y: c1g1l1_comIn.y.filter((_, index) => index % 100 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'blue',
    symbol: 'circle'
  },
  showlegend: false
};

const markerTraceFreeLIFE = {
  x: c1g2l1_comIn.x.filter((_: any, index: any) => index % 100 === 0),
  y: c1g2l1_comIn.y.filter((_: any, index: any) => index % 100 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'green',
    symbol: 'square'
  },
  showlegend: false
};


const markerTraceMooNMD = {
  x: c1g3l1_comIn.x.filter((_: any, index: any) => index % 100 === 0),
  y: c1g3l1_comIn.y.filter((_: any, index: any) => index % 100 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'red',
    symbol: 'x'
  },
  showlegend: false
};


const marker2TraceTP2D = {
  x: c1g1l2_comIn.x.filter((_: any, index: any) => index % 90 === 0),
  y: c1g1l2_comIn.y.filter((_: any, index: any) => index % 90 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'blue',
    symbol: 'circle'
  },
  showlegend: false
};

const marker2TraceFreeLIFE = {
  x: c1g2l2_comIn.x.filter((_: any, index: any) => index % 50 === 0),
  y: c1g2l2_comIn.y.filter((_: any, index: any) => index % 50 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'green',
    symbol: 'square'
  },
  showlegend: false
};

const marker2TraceMooNMD = {
  x: c1g3l2_comIn.x.filter((_: any, index: any) => index % 90 === 0),
  y: c1g3l2_comIn.y.filter((_: any, index: any) => index % 90 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'red',
    symbol: 'x'
  },
  showlegend: false
};

const marker3TraceTP2D = {
  x: c1g1l3_comIn.x.filter((_: any, index: any) => index % 300 === 0),
  y: c1g1l3_comIn.y.filter((_: any, index: any) => index % 300 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'blue',
    symbol: 'circle'
  },
  showlegend: false
};

const marker3TraceFreeLIFE = {
  x: c1g2l3_comIn.x.filter((_: any, index: any) => index % 90 === 0),
  y: c1g2l3_comIn.y.filter((_: any, index: any) => index % 90 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'green',
    symbol: 'square'
  },
  showlegend: false
};


const marker3TraceMooNMD = {
  x: c1g3l3_comIn.x.filter((_: any, index: any) => index % 90 === 0),
  y: c1g3l3_comIn.y.filter((_: any, index: any) => index % 90 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'red',
    symbol: 'x'
  },
  showlegend: false
};

const case1bubble2Com_data = [
  [c1g1l1_comIn, markerTraceTP2D,
   c1g2l1_comIn,markerTraceFreeLIFE,
   c1g3l1_comIn,markerTraceMooNMD
  ],
  [c1g1l2_comIn, marker2TraceTP2D,
   c1g2l2_comIn, marker2TraceFreeLIFE,
   c1g3l2_comIn, marker2TraceMooNMD
  ],
  [c1g1l3_comIn,marker3TraceTP2D,
   c1g2l3_comIn,marker3TraceFreeLIFE,
   c1g3l3_comIn, marker3TraceMooNMD
   ]       
  ]

return {
  data: case1bubble2Com_data,
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


 //=====================================================================================
  // Here we have the data of the Rise Velocity (Bubble 2D Case 1)
  //=====================================================================================
  getriseVelocityData(
    c1g1l1_risevelocityIn: PlotData,
    c1g2l1_risevelocityIn: PlotData,
    c1g3l1_risevelocityIn: PlotData,
    c1g1l2_risevelocityIn: PlotData,
    c1g2l2_risevelocityIn: PlotData,
    c1g3l2_risevelocityIn: PlotData,
    c1g1l3_risevelocityIn: PlotData,
    c1g2l3_risevelocityIn: PlotData,
    c1g3l3_risevelocityIn: PlotData) {

const markerTraceTP2D = {
  x: c1g1l1_risevelocityIn.x.filter((_, index) => index % 100 === 0),
  y: c1g1l1_risevelocityIn.y.filter((_, index) => index % 100 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'blue',
    symbol: 'circle'
  },
  showlegend: false
};

const markerTraceFreeLIFE = {
  x: c1g2l1_risevelocityIn.x.filter((_: any, index: any) => index % 50 === 0),
  y: c1g2l1_risevelocityIn.y.filter((_: any, index: any) => index % 50 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'green',
    symbol: 'square'
  },
  showlegend: false
};


const markerTraceMooNMD = {
  x: c1g3l1_risevelocityIn.x.filter((_: any, index: any) => index % 100 === 0),
  y: c1g3l1_risevelocityIn.y.filter((_: any, index: any) => index % 100 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'red',
    symbol: 'x'
  },
  showlegend: false
};


const marker2TraceTP2D = {
  x: c1g1l2_risevelocityIn.x.filter((_: any, index: any) => index % 90 === 0),
  y: c1g1l2_risevelocityIn.y.filter((_: any, index: any) => index % 90 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'blue',
    symbol: 'circle'
  },
  showlegend: false
};

const marker2TraceFreeLIFE = {
  x: c1g2l2_risevelocityIn.x.filter((_: any, index: any) => index % 50 === 0),
  y: c1g2l2_risevelocityIn.y.filter((_: any, index: any) => index % 50 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'green',
    symbol: 'square'
  },
  showlegend: false
};

const marker2TraceMooNMD = {
  x: c1g3l2_risevelocityIn.x.filter((_: any, index: any) => index % 90 === 0),
  y: c1g3l2_risevelocityIn.y.filter((_: any, index: any) => index % 90 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'red',
    symbol: 'x'
  },
  showlegend: false
};

const marker3TraceTP2D = {
  x: c1g1l3_risevelocityIn.x.filter((_: any, index: any) => index % 300 === 0),
  y: c1g1l3_risevelocityIn.y.filter((_: any, index: any) => index % 300 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'blue',
    symbol: 'circle'
  },
  showlegend: false
};

const marker3TraceFreeLIFE = {
  x: c1g2l3_risevelocityIn.x.filter((_: any, index: any) => index % 50 === 0),
  y: c1g2l3_risevelocityIn.y.filter((_: any, index: any) => index % 50 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'green',
    symbol: 'square'
  },
  showlegend: false
};


const marker3TraceMooNMD = {
  x: c1g3l3_risevelocityIn.x.filter((_: any, index: any) => index % 90 === 0),
  y: c1g3l3_risevelocityIn.y.filter((_: any, index: any) => index % 90 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'red',
    symbol: 'x'
  },
  showlegend: false
};

const case1bubble2Com_data = [
  [c1g1l1_risevelocityIn, markerTraceTP2D,
   c1g2l1_risevelocityIn,markerTraceFreeLIFE,
   c1g3l1_risevelocityIn,markerTraceMooNMD
  ],
  [c1g1l2_risevelocityIn, marker2TraceTP2D,
   c1g2l2_risevelocityIn, marker2TraceFreeLIFE,
   c1g3l2_risevelocityIn, marker2TraceMooNMD
  ],
  [c1g1l3_risevelocityIn,marker3TraceTP2D,
   c1g2l3_risevelocityIn,marker3TraceFreeLIFE,
   c1g3l3_risevelocityIn, marker3TraceMooNMD
   ]       
  ]

return {
  data: case1bubble2Com_data,
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
          text: 'Rise Velocity',
          font: {
            color: '#ffffffb3'
          }
        }
      }
    }
}
};


 //=====================================================================================
  // Here we have the data of the bubble Mass (Bubble 2D Case 1)
  //=====================================================================================
  getmassData(
    c1g1l1_massIn: PlotData,
    c1g2l1_massIn: PlotData,
    c1g3l1_massIn: PlotData,
    c1g1l2_massIn: PlotData,
    c1g2l2_massIn: PlotData,
    c1g3l2_massIn: PlotData,
    c1g1l3_massIn: PlotData,
    c1g2l3_massIn: PlotData,
    c1g3l3_massIn: PlotData) {

const markerTraceTP2D = {
  x: c1g1l1_massIn.x.filter((_, index) => index % 100 === 0),
  y: c1g1l1_massIn.y.filter((_, index) => index % 100 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'blue',
    symbol: 'circle'
  },
  showlegend: false
};

const markerTraceFreeLIFE = {
  x: c1g2l1_massIn.x.filter((_: any, index: any) => index % 100 === 0),
  y: c1g2l1_massIn.y.filter((_: any, index: any) => index % 100 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'green',
    symbol: 'square'
  },
  showlegend: false
};


const markerTraceMooNMD = {
  x: c1g3l1_massIn.x.filter((_: any, index: any) => index % 100 === 0),
  y: c1g3l1_massIn.y.filter((_: any, index: any) => index % 100 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'red',
    symbol: 'x'
  },
  showlegend: false
};


const marker2TraceTP2D = {
  x: c1g1l2_massIn.x.filter((_: any, index: any) => index % 90 === 0),
  y: c1g1l2_massIn.y.filter((_: any, index: any) => index % 90 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'blue',
    symbol: 'circle'
  },
  showlegend: false
};

const marker2TraceFreeLIFE = {
  x: c1g2l2_massIn.x.filter((_: any, index: any) => index % 50 === 0),
  y: c1g2l2_massIn.y.filter((_: any, index: any) => index % 50 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'green',
    symbol: 'square'
  },
  showlegend: false
};

const marker2TraceMooNMD = {
  x: c1g3l2_massIn.x.filter((_: any, index: any) => index % 90 === 0),
  y: c1g3l2_massIn.y.filter((_: any, index: any) => index % 90 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'red',
    symbol: 'x'
  },
  showlegend: false
};

const marker3TraceTP2D = {
  x: c1g1l3_massIn.x.filter((_: any, index: any) => index % 300 === 0),
  y: c1g1l3_massIn.y.filter((_: any, index: any) => index % 300 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'blue',
    symbol: 'circle'
  },
  showlegend: false
};

const marker3TraceFreeLIFE = {
  x: c1g2l3_massIn.x.filter((_: any, index: any) => index % 90 === 0),
  y: c1g2l3_massIn.y.filter((_: any, index: any) => index % 90 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'green',
    symbol: 'square'
  },
  showlegend: false
};


const marker3TraceMooNMD = {
  x: c1g3l3_massIn.x.filter((_: any, index: any) => index % 90 === 0),
  y: c1g3l3_massIn.y.filter((_: any, index: any) => index % 90 === 0),
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'red',
    symbol: 'x'
  },
  showlegend: false
};

const case1massCom_data = [
  [c1g1l1_massIn, markerTraceTP2D,
   c1g2l1_massIn,markerTraceFreeLIFE,
   c1g3l1_massIn,markerTraceMooNMD
  ],
  [c1g1l2_massIn, marker2TraceTP2D,
   c1g2l2_massIn, marker2TraceFreeLIFE,
   c1g3l2_massIn, marker2TraceMooNMD
  ],
  [c1g1l3_massIn,marker3TraceTP2D,
   c1g2l3_massIn,marker3TraceFreeLIFE,
   c1g3l3_massIn, marker3TraceMooNMD
   ]       
  ]

return {
  data: case1massCom_data,
    layout: {
      title: {
        text: 'Bubble Mass',
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
          text: 'Bubble Mass',
          font: {
            color: '#ffffffb3'
          }
        }
      }
    }
}
};
  
  //=====================================================================================
  // Here we have the data of the circularity (Bubble 2D Case 2)
  //=====================================================================================
  getCase2Bubble2circularityData(
        c2g1l4_circularityIn: PlotData, 
        c2g2l1_circularityIn: PlotData,
        c2g3l2_circularityIn: PlotData,
        c2g1l5_circularityIn: PlotData,
        c2g2l2_circularityIn: PlotData,
        c2g3l3_circularityIn: PlotData,
        c2g1l6_circularityIn: PlotData,
        c2g2l3_circularityIn: PlotData,
        c2g3l4_circularityIn: PlotData,
        ff_circularityL1In: PlotData,
        ff_circularityL2In: PlotData,
        ff_circularityL3In: PlotData) {

    const markerTraceTP2D = {
      x: c2g1l4_circularityIn.x.filter((_, index) => index % 90 === 0),
      y: c2g1l4_circularityIn.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const marker2TraceTP2D = {
      x: c2g1l5_circularityIn.x.filter((_: any, index: any) => index % 90 === 0),
      y: c2g1l5_circularityIn.y.filter((_: any, index: any) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const marker3TraceTP2D = {
      x: c2g1l6_circularityIn.x.filter((_: any, index: any) => index % 90 === 0),
      y: c2g1l6_circularityIn.y.filter((_: any, index: any) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };


    const markerTraceFreeLIFE = {
      x: c2g2l1_circularityIn.x.filter((_: any, index: any) => index % 90 === 0),
      y: c2g2l1_circularityIn.y.filter((_: any, index: any) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };

     const marker2TraceFreeLIFE = {
      x: c2g2l2_circularityIn.x.filter((_: any, index: any) => index % 90 === 0),
      y: c2g2l2_circularityIn.y.filter((_: any, index: any) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };

    const marker3TraceFreeLIFE = {
      x: c2g2l3_circularityIn.x.filter((_: any, index: any) => index % 90 === 0),
      y: c2g2l3_circularityIn.y.filter((_: any, index: any) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };

    const markerTraceMooNMD = {
      x: c2g3l2_circularityIn.x.filter((_: any, index: any) => index % 90 === 0),
      y: c2g3l2_circularityIn.y.filter((_: any, index: any) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };


 
    const marker2TraceMooNMD = {
      x: c2g3l3_circularityIn.x.filter((_: any, index: any) => index % 90 === 0),
      y: c2g3l3_circularityIn.y.filter((_: any, index: any) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };

 
    const marker3TraceMooNMD = {
      x: c2g3l4_circularityIn.x.filter((_: any, index: any) => index % 90 === 0),
      y: c2g3l4_circularityIn.y.filter((_: any, index: any) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };
    
    const marker1TraceFeatFloWer = {
      x: ff_circularityL1In.x.filter((_: any, index: any) => index % 3500 === 0),
      y: ff_circularityL1In.y.filter((_: any, index: any) => index % 3500 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'orange',
        symbol: 'x'
      },
      showlegend: false
    };

    const marker2TraceFeatFloWer = {
      x: ff_circularityL2In.x.filter((_: any, index: any) => index % 3500 === 0),
      y: ff_circularityL2In.y.filter((_: any, index: any) => index % 3500 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'orange',
        symbol: 'x'
      },
      showlegend: false
    };

    const marker3TraceFeatFloWer = {
      x: ff_circularityL3In.x.filter((_: any, index: any) => index % 4000 === 0),
      y: ff_circularityL3In.y.filter((_: any, index: any) => index % 4000 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'orange',
        symbol: 'x'
      },
      showlegend: false
    };



    const case2bubble2Circularity_data = [
      [c2g1l4_circularityIn, markerTraceTP2D,
       c2g2l1_circularityIn,markerTraceFreeLIFE,
       c2g3l2_circularityIn,markerTraceMooNMD,
       ff_circularityL1In, marker1TraceFeatFloWer
      ],
      [c2g1l5_circularityIn, marker2TraceTP2D,
       c2g2l2_circularityIn, marker2TraceFreeLIFE,
       c2g3l3_circularityIn, marker2TraceMooNMD,
       ff_circularityL2In, marker2TraceFeatFloWer
      ],
      [c2g1l6_circularityIn,marker3TraceTP2D,
       c2g2l3_circularityIn,marker3TraceFreeLIFE,
       c2g3l4_circularityIn, marker3TraceMooNMD,
       ff_circularityL3In, marker3TraceFeatFloWer
       ]       
      ]

    return {
      data: case2bubble2Circularity_data,
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
              text: 'Circularity',
              font: {
                color: '#ffffffb3'
              }
            }
          }
        }
    }
  };

  getCase2Bubble2VelocityData(c2g1l4_rise_vel: PlotData,
                              c2g2l1_rise_vel: PlotData, 
                              c2g3l2_rise_vel: PlotData, 
                              c2g1l5_rise_vel: PlotData, 
                              c2g2l2_rise_vel: PlotData, 
                              c2g3l3_rise_vel: PlotData, 
                              c2g1l6_rise_vel: PlotData,
                              c2g2l3_rise_vel: PlotData,
                              c2g3l4_rise_vel: PlotData) {
    const markerTraceTP2D = {
      x: c2g1l4_rise_vel.x.filter((_, index) => index % 90 === 0),
      y: c2g1l4_rise_vel.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const markerTraceFreeLIFE = {
      x: c2g2l1_rise_vel.x.filter((_, index) => index % 90 === 0),
      y: c2g2l1_rise_vel.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };
  
    const markerTraceMooNMD = {
      x: c2g3l2_rise_vel.x.filter((_, index) => index % 90 === 0),
      y: c2g3l2_rise_vel.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };

    const marker2TraceTP2D = {
      x: c2g1l5_rise_vel.x.filter((_, index) => index % 90 === 0),
      y: c2g1l5_rise_vel.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const marker2TraceFreeLIFE = {
      x: c2g2l2_rise_vel.x.filter((_, index) => index % 90 === 0),
      y: c2g2l2_rise_vel.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };
  
    const marker2TraceMooNMD = {
      x: c2g3l3_rise_vel.x.filter((_, index) => index % 90 === 0),
      y: c2g3l3_rise_vel.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };

    const marker3TraceTP2D = {
      x: c2g1l6_rise_vel.x.filter((_, index) => index % 90 === 0),
      y: c2g1l6_rise_vel.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const marker3TraceFreeLIFE = {
      x: c2g2l3_rise_vel.x.filter((_, index) => index % 90 === 0),
      y: c2g2l3_rise_vel.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };
  
    const marker3TraceMooNMD = {
      x: c2g3l4_rise_vel.x.filter((_, index) => index % 90 === 0),
      y: c2g3l4_rise_vel.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };
    
    const case2bubble2RiseVelocity_data = [
      [c2g1l4_rise_vel,markerTraceTP2D,
       c2g2l1_rise_vel,markerTraceFreeLIFE,
       c2g3l2_rise_vel,markerTraceMooNMD
      ],
      [c2g1l5_rise_vel, marker2TraceTP2D,
       c2g2l2_rise_vel, marker2TraceFreeLIFE,
       c2g3l3_rise_vel, marker2TraceMooNMD
      ],
      [c2g1l6_rise_vel,marker3TraceTP2D,
       c2g2l3_rise_vel,marker3TraceFreeLIFE,
       c2g3l4_rise_vel,marker3TraceMooNMD
       ]       
      ]

    return {
      data: case2bubble2RiseVelocity_data,
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
              text: 'Velocity',
              font: {
                color: '#ffffffb3'
              }
            }
          }
        }
    }
  };  

  getCase2Bubble2MassData(c2g1l4_bubble_mass: PlotData,
                          c2g2l1_bubble_mass: PlotData, 
                          c2g3l2_bubble_mass: PlotData, 
                          c2g1l5_bubble_mass: PlotData, 
                          c2g2l2_bubble_mass: PlotData, 
                          c2g3l3_bubble_mass: PlotData, 
                          c2g1l6_bubble_mass: PlotData,
                          c2g2l3_bubble_mass: PlotData,
                          c2g3l4_bubble_mass: PlotData,
                          ff_bubbleMassL1: PlotData,
                          ff_bubbleMassL2: PlotData,
                          ff_bubbleMassL3: PlotData) {

    const markerTraceTP2D = {
      x: c2g1l4_bubble_mass.x.filter((_, index) => index % 1000 === 0),
      y: c2g1l4_bubble_mass.y.filter((_, index) => index % 1000 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const markerTraceFreeLIFE = {
      x: c2g2l1_bubble_mass.x.filter((_, index) => index % 10 === 0),
      y: c2g2l1_bubble_mass.y.filter((_, index) => index % 10 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };
  
    const markerTraceMooNMD = {
      x: c2g3l2_bubble_mass.x.filter((_, index) => index % 90 === 0),
      y: c2g3l2_bubble_mass.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };

    const markerTraceFeatFloWer = {
      x: ff_bubbleMassL1.x.filter((_, index) => index % 3500 === 0),
      y: ff_bubbleMassL1.y.filter((_, index) => index % 3500 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'orange',
        symbol: 'x'
      },
      showlegend: false
    };

    const marker2TraceTP2D = {
      x: c2g1l5_bubble_mass.x.filter((_, index) => index % 1000 === 0),
      y: c2g1l5_bubble_mass.y.filter((_, index) => index % 1000 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const marker2TraceFreeLIFE = {
      x: c2g2l2_bubble_mass.x.filter((_, index) => index % 40 === 0),
      y: c2g2l2_bubble_mass.y.filter((_, index) => index % 40 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };
  
    const marker2TraceMooNMD = {
      x: c2g3l3_bubble_mass.x.filter((_, index) => index % 90 === 0),
      y: c2g3l3_bubble_mass.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };

    const marker2TraceFeatFloWer = {
      x: ff_bubbleMassL2.x.filter((_, index) => index % 3500 === 0),
      y: ff_bubbleMassL2.y.filter((_, index) => index % 3500 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'orange',
        symbol: 'x'
      },
      showlegend: false
    };

    const marker3TraceTP2D = {
      x: c2g1l6_bubble_mass.x.filter((_, index) => index % 1000 === 0),
      y: c2g1l6_bubble_mass.y.filter((_, index) => index % 1000 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const marker3TraceFreeLIFE = {
      x: c2g2l3_bubble_mass.x.filter((_, index) => index % 90 === 0),
      y: c2g2l3_bubble_mass.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };
  
    const marker3TraceMooNMD = {
      x: c2g3l4_bubble_mass.x.filter((_, index) => index % 90 === 0),
      y: c2g3l4_bubble_mass.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };

    const marker3TraceFeatFloWer = {
      x: ff_bubbleMassL3.x.filter((_, index) => index % 3500 === 0),
      y: ff_bubbleMassL3.y.filter((_, index) => index % 3500 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'orange',
        symbol: 'x'
      },
      showlegend: false
    };
    
    const case2bubble2Mass_data = [
      [c2g1l4_bubble_mass, markerTraceTP2D,
        c2g2l1_bubble_mass,markerTraceFreeLIFE,
        c2g3l2_bubble_mass,markerTraceMooNMD,
        ff_bubbleMassL1, markerTraceFeatFloWer
      ],
      [c2g1l5_bubble_mass, marker2TraceTP2D,
       c2g2l2_bubble_mass, marker2TraceFreeLIFE,
       c2g3l3_bubble_mass, marker2TraceMooNMD,
       ff_bubbleMassL2, marker2TraceFeatFloWer
      ],
      [c2g1l6_bubble_mass,marker3TraceTP2D,
       c2g2l3_bubble_mass,marker3TraceFreeLIFE,
       c2g3l4_bubble_mass, marker3TraceMooNMD,
       ff_bubbleMassL3, marker3TraceFeatFloWer
       ]       
      ]

    return {
      data: case2bubble2Mass_data,
        layout: {
          title: {
            text: 'Mass/Area',
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
              text: 'Mass/Area',
              font: {
                color: '#ffffffb3'
              }
            }
          }
        }
    }
  };  

  getCase2Bubble2comData(
        c2g1l4_com: PlotData, 
        c2g2l1_com: PlotData,
        c2g3l2_com: PlotData,
        c2g1l5_com: PlotData,
        c2g2l2_com: PlotData,
        c2g3l3_com: PlotData,
        c2g1l6_com: PlotData,
        c2g2l3_com: PlotData,
        c2g3l4_com: PlotData) {

    const markerTraceTP2D = {
      x: c2g1l4_com.x.filter((_, index) => index % 90 === 0),
      y: c2g1l4_com.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const markerTraceFreeLIFE = {
      x: c2g2l1_com.x.filter((_, index) => index % 90 === 0),
      y: c2g2l1_com.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };
  
    const markerTraceMooNMD = {
      x: c2g3l2_com.x.filter((_, index) => index % 90 === 0),
      y: c2g3l2_com.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };

    const marker2TraceTP2D = {
      x: c2g1l5_com.x.filter((_, index) => index % 90 === 0),
      y: c2g1l5_com.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const marker2TraceFreeLIFE = {
      x: c2g2l2_com.x.filter((_, index) => index % 90 === 0),
      y: c2g2l2_com.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };
  
    const marker2TraceMooNMD = {
      x: c2g3l3_com.x.filter((_, index) => index % 90 === 0),
      y: c2g3l3_com.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };

    const marker3TraceTP2D = {
      x: c2g1l6_com.x.filter((_, index) => index % 90 === 0),
      y: c2g1l6_com.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        symbol: 'circle'
      },
      showlegend: false
    };

    const marker3TraceFreeLIFE = {
      x: c2g2l3_com.x.filter((_, index) => index % 90 === 0),
      y: c2g2l3_com.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'green',
        symbol: 'square'
      },
      showlegend: false
    };
  
    const marker3TraceMooNMD = {
      x: c2g3l4_com.x.filter((_, index) => index % 90 === 0),
      y: c2g3l4_com.y.filter((_, index) => index % 90 === 0),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        symbol: 'x'
      },
      showlegend: false
    };
    
    const case2bubble2com_data = [
      [c2g1l4_com, markerTraceTP2D,
        c2g2l1_com,markerTraceFreeLIFE,
        c2g3l2_com,markerTraceMooNMD
      ],
      [c2g1l5_com, marker2TraceTP2D,
       c2g2l2_com, marker2TraceFreeLIFE,
       c2g3l3_com, marker2TraceMooNMD
      ],
      [c2g1l6_com,marker3TraceTP2D,
       c2g2l3_com,marker3TraceTP2D,
       c2g3l4_com, marker3TraceMooNMD
       ]       
      ]

    return {
      data: case2bubble2com_data,
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
}