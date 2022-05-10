
export interface DragTime {
  case: string;
  cells: number;
  dragmax: number;
  liftmax: number;
  liftmin: number;
  tstep: number;
  time: string;
}

export const dragTimeData: DragTime[] = [
{case: "FFL1", cells: 6144, dragmax: 3.2207, liftmax: 0.0027, liftmin: -0.0095, tstep: 0.010, time: "3220 x 2"},
{case: "FFL2", cells: 49152, dragmax: 3.2877, liftmax: 0.0028, liftmin: -0.010892, tstep: 0.010, time: "17300 x 4"},
{case: "FFL3", cells: 393216, dragmax: 3.2963, liftmax: 0.0028, liftmin: -0.010992, tstep: 0.010, time: "35550 x 24"},
{case: "FFL4", cells: 3145728, dragmax: 3.2978, liftmax: 0.0028, liftmin: -0.010999, tstep: 0.005, time: "214473 x 48"},
];

export const dragTimeDataOF: DragTime[] = [
{case: "OFL2", cells: 49152,  dragmax: 3.33963, liftmax: 0.0029, liftmin: -0.0128, tstep: 0.0025, time: "4850"},
{case: "OFL3", cells: 393216, dragmax: 3.3233,  liftmax: 0.0028, liftmin: -0.0118, tstep: 0.001, time: "76300 x 4"},
{case: "OFL4", cells: 3145728,dragmax: 3.3038,  liftmax: 0.0012, liftmin: -0.0112, tstep: 0.005, time: "593500 x 24"},
];

export const dragTimeDataCFX: DragTime[] = [
{case: "CFXL2", cells: 49152,  dragmax: 3.3336, liftmax: 0.0028, liftmin: -0.0106, tstep: 0.01, time: "22320"},
{case: "CFXL3", cells: 393216, dragmax: 3.3334,  liftmax: 0.0028, liftmin: -0.0118, tstep: 0.005, time: "61530 x 4"},
{case: "CFXL4", cells: 3145728,dragmax: 3.3084,  liftmax: 0.0028, liftmin: -0.0113, tstep: 0.005, time: "115300 x 24"},
];

export const dragTimeDataL4: DragTime[] = [
{case: "FFL2", cells: 49152, dragmax: 3.2877, liftmax: 0.0028, liftmin: -0.010892, tstep: 0.010, time: "17300 x 4"},
{case: "OFL4", cells: 3145728,dragmax: 3.3038,  liftmax: 0.0012, liftmin: -0.0112, tstep: 0.005, time: "593500 x 24"},
{case: "CFXL4", cells: 3145728,dragmax: 3.3084,  liftmax: 0.0028, liftmin: -0.0113, tstep: 0.005, time: "115300 x 24"},
];
