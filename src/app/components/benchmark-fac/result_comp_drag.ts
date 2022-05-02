export interface CompDragLiftTime {
  numCells: string;
  name: string;
  drag: number;
  lift: number;
  errDrag: number;
  errLift: number;
}

export const COMPARISON_DRAG_TIME: CompDragLiftTime[] = [
  {numCells: "L1",      name: 'CFX',      drag: 6.06750, lift: 0.01255,  errDrag: 1.91, errLift: 33},
  {numCells: "6144",    name: 'OpenFOAM', drag: 6.13408, lift: 0.01734,  errDrag: 0.83, errLift: 84},
  {numCells: "",        name: 'FeatFlow', drag: 6.13973, lift: 0.00956,  errDrag: 0.74, errLift: 1.8},
  {numCells: "L2",      name: 'CFX',      drag: 6.13453, lift: 0.00817,  errDrag: 0.82, errLift: 14},
  {numCells: "49152",   name: 'OpenFOAM', drag: 6.19702, lift: 0.01099,  errDrag: 0.19, errLift: 17},
  {numCells: "",        name: 'FeatFlow', drag: 6.17433, lift: 0.009381, errDrag: 0.18, errLift: 0.21},
  {numCells: "L3",      name: 'CFX',      drag: 6.17481, lift: 0.00928,  errDrag: 0.17, errLift: 1.3},
  {numCells: "393216",  name: 'OpenFOAM', drag: 6.19362, lift: 0.01001,  errDrag: 0.13, errLift: 6.5},
  {numCells: "",        name: 'FeatFlow', drag: 6.18260, lift: 0.009387, errDrag: 0.04, errLift: 0.15},
  {numCells: "L4",      name: 'CFX',      drag: 6.18287, lift: 0.009387, errDrag: 0.04, errLift: 0.15},
  {numCells: "3145728", name: 'OpenFOAM', drag: 6.18931, lift: 0.00973,  errDrag: 0.06, errLift: 3.5},
  {numCells: "",        name: 'FeatFlow', drag: 6.18465, lift: 0.009397, errDrag: 0.01, errLift: 0.05},
];
