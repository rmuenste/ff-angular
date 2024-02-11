import { Injectable } from '@angular/core';
import { dt_1 } from '../components/benchmark-bubble3/data'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getPlotData() {
  const chartSpherecityData = [...dt_1.data];
  return {
    data: chartSpherecityData,
    layout: {title: {
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
}
