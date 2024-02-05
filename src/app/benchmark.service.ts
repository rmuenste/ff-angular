import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BenchmarkService {
  private benchmarks: any[] = [];

  constructor() { 
    // Initialize with some default data (you can load from an external source here)
    this.benchmarks = [
      {
        id: 1,
        name: 'Flow Around A Cylinder',
      },
      {
        id: 2,
        name: '3D Rising Bubble',
      },
    ];
  }

  getAllBenchmarks(): any[] {
    return this.benchmarks;
  }

  getBenchmarkById(id: number): any {
    return this.benchmarks.find(benchmark => benchmark.id === id);
  }
}
