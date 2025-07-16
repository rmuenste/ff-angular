
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

export interface Notation{
  abbreviation: string;
  description: string;
}

export interface Reference{
  file: string;
  action: string;
  fileURL: string;
}

export interface benchFormat{
  Column: string,
  Quantity: string
}

export interface ReferenceBubbleS{
  file: string;
  action: string;
  fileURL: string;
}

export interface Marker {
  color: string;
}

export interface PlotData {
  x: number[];
  y: number[];
  type: string; // could use a union type, e.g., 'scatter' | 'bar' | etc.
  mode: string; // could use a union type, e.g., 'lines' | 'points' | 'lines+points'
  name: string;
  marker: Marker;
}

//// Example usage:
//const data: PlotData = {
//  x: [1, 2, 3, 4],
//  y: [1, 2, 3, 4],
//  type: "scatter",
//  mode: "lines+points",
//  name: "FreeLife",
//  marker: { color: "green" },
//};


export const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, p1: 1000, p2: 100, mu1: 10, mu2: 1, g: 0.98, sigma: 24.5, re: 35, eo: 10, rel: 10, relmu: 10},
  {position: 2, p1: 1000, p2: 1, mu1: 10, mu2: 0.1, g: 0.98, sigma: 1.96, re: 35, eo: 125, rel: 1000, relmu: 100},];

export const NOTATION_DATA: Notation[] = [
  {abbreviation: 'c1', description: 'Test Case 1'},
  {abbreviation: 'c2', description: 'Test Case 2'},
  {abbreviation: 'g1', description: 'TU Dortmund (TP2D)'},
  {abbreviation: 'g2', description: 'EPFL Lausanne (FreeLIFE)'},
  {abbreviation: 'g3', description: 'Uni Magdebug (MooNMD)'},
  {abbreviation: 'l#', description: 'Grid Refinement Level (higher number means denser grid)'}
];

export const REFERENCE_DATA: Reference[] = [
  {file: 'All in one zip file', action: 'Download', fileURL: "assets/files/bubble2/quantities.zip"},
  ];

export const BENCHMARK_FORMAT: benchFormat[] = [
  {Column: '1',  Quantity: 'Time'},
  {Column: '2',  Quantity: 'Bubble Mass or Area'},
  {Column: '3',  Quantity: 'Circularity'},
  {Column: '4',  Quantity: 'Center of Mass (y-coordinate)'},
  {Column: '5',  Quantity: 'Rise Velocity'},

  ];

export const REFERENCE_BubbleS: ReferenceBubbleS[] = [
  {file: 'All in one zip file', action: 'Download', fileURL : "assets/files/bubble2/shapes.zip"},
  ];

