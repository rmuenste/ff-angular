export interface descTableElement {
  name: string;
  level: string;
  dofu: number;
  dofp: number;
  doft: number;
  cells: string;
}

export const ELEMENT_DATA: descTableElement[] = [
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
