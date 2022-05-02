
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
