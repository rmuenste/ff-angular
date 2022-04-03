import { Component, OnInit } from '@angular/core';

export interface DragTime {
  case: string;
  cells: number;
  dragmax: number;
  liftmax: number;
  liftmin: number;
  tstep: number;
  time: string;
}

export interface PeriodicElement {
  name: string;
  level: string;
  dofu: number;
  dofp: number;
  doft: number;
  cells: string;
}

export interface ReferenceElement {
  column: number;
  quantity: string;
}

export interface FileDownload {
  file: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {level: "", name: 'CFX', cells: "", dofu: 21828, dofp: 7276, doft: 29104},
  {level: "L1", name: 'OpenFOAM', cells: "6144", dofu: 18423, dofp: 6144, doft: 24567},
  {level: "", name: 'FeatFlow', cells: "", dofu: 174624, dofp: 24576, doft: 199200},
  {level: "", name: 'CFX', cells: "", dofu: 160776, dofp: 53592, doft: 214368},
  {level: "L2", name: 'OpenFOAM', cells: "49152", dofu: 147456, dofp: 49152, doft: 196608},
  {level: "", name: 'FeatFlow', cells: "", dofu: 1286208, dofp: 196608, doft: 1482816},
  {level: "", name: 'CFX', cells: "", dofu: 1232400, dofp: 410800, doft: 1643200},
  {level: "L3", name: 'OpenFOAM', cells: "393216", dofu: 1179648, dofp: 393216, doft: 1572864},
  {level: "", name: 'FeatFlow', cells: "", dofu: 9859200, dofp: 1572864, doft: 11432064},
  {level: "", name: 'CFX', cells: "", dofu: 9647136, dofp: 3215712, doft: 12862848},
  {level: "L4", name: 'OpenFOAM', cells: "9437184", dofu: 9437184, dofp: 3145728, doft: 12582912},
  {level: "", name: 'FeatFlow', cells: "", dofu: 77177104, dofp: 12582912, doft: 89760016},
];

const dragTimeData: DragTime[] = [
{case: "FFL1", cells: 6144, dragmax: 3.2207, liftmax: 0.0027, liftmin: -0.0095, tstep: 0.010, time: "3220 x 2"},
{case: "FFL2", cells: 49152, dragmax: 3.2877, liftmax: 0.0028, liftmin: -0.010892, tstep: 0.010, time: "17300 x 4"},
{case: "FFL3", cells: 393216, dragmax: 3.2963, liftmax: 0.0028, liftmin: -0.010992, tstep: 0.010, time: "35550 x 24"},
{case: "FFL4", cells: 3145728, dragmax: 3.2978, liftmax: 0.0028, liftmin: -0.010999, tstep: 0.005, time: "214473 x 48"},
];

const referenceData: ReferenceElement[] = [
  {column: 1, quantity: "Time"},
  {column: 2, quantity: "Drag"},
  {column: 3, quantity: "Lift"},
  {column: 4, quantity: "Z-Force"},
];

const fileData: FileDownload[] = [
  {file: "BenchValues.txt", action: "Download"},
];

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

  mathEq = `When $ a \\ne 0 $`;

  constructor() { }

  ngOnInit(): void {
  }

}
