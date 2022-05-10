import { Component, OnInit } from '@angular/core';
import { ELEMENT_DATA } from './lvl_dofs_comp';
import { dragTimeData } from './drag_time_results';
import { dragTimeDataOF } from './drag_time_results';
import { dragTimeDataCFX } from './drag_time_results';
import { dragTimeDataL4 } from './drag_time_results';
import { COMPARISON_DRAG_TIME } from './result_comp_drag';
import { FF_ERROR_RESULTS } from './ff_error_results'
import { VS_ERROR_RESULTS } from './ff_error_results'
import { OF_ERROR_RESULTS } from './of_error_results'
import { CFX_ERROR_RESULTS } from './cfx_error_results'


export interface ReferenceElement {
  column: number;
  quantity: string;
}

export interface FileDownload {
  file: string;
  action: string;
}


const referenceData: ReferenceElement[] = [
  {column: 1, quantity: "Time"},
  {column: 2, quantity: "Drag"},
  {column: 3, quantity: "Lift"},
  {column: 4, quantity: "Z-Force"},
];

const fileData: FileDownload[] = [
  {file: "BenchValues.txt", action: "Download"},
];

//Case ID #86594961
@Component({
  selector: 'app-benchmark-fac',
  templateUrl: './benchmark-fac.component.html',
  styleUrls: ['./benchmark-fac.component.scss']
})
export class BenchmarkFacComponent implements OnInit {

  displayedColumns: string[] = ['level', 'cells', 'name', 'dofu', 'dofp', 'doft'];
  dataSource = ELEMENT_DATA;

  displayedColumnsDragTime: string[] = ['case', 'cells', 'dragmax', 'liftmax', 'liftmin', 'tstep', 'time'];
  dataSourceDragTime = dragTimeData;

  displayedColumnsRefData: string[] = ['column', 'quantity'];
  dataSourceRefData = referenceData;

  displayedColumnsFiles: string[] = ['file', 'action'];
  dataSourceFiles = fileData;

  displayedColumnsDragLiftComp: string[] = ['numCells', 'name', 'drag', 'lift', 'errDrag', 'errLift'];
  dataSourceDragLiftComp = COMPARISON_DRAG_TIME;

  displayedColumnsErrorTableFF: string[] = ['name', "errcdmax", "errclmin", "errl2cd", "errl2cl", "errlinfcd", "errlinfcl"];
  dataSourceErrorTableFF = FF_ERROR_RESULTS;

  dataSourceOF =  dragTimeDataOF;
  dataSourceErrorTableOF = OF_ERROR_RESULTS;

  dataSourceCFX =  dragTimeDataCFX;
  dataSourceErrorTableCFX = CFX_ERROR_RESULTS;

  dataSourceVSL4 =  dragTimeDataL4;
  dataSourceErrorTableVS = VS_ERROR_RESULTS;

  view: [number, number] = [700, 300];

  mathEq = `When $ a \\ne 0 $`;

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  constructor() { }

  ngOnInit(): void {
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

}
