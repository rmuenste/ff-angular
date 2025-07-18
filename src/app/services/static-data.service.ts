import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IDataService } from './interfaces/data-service.interface';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService implements IDataService {

  // View-to-files mapping (same as server-side)
  private readonly VIEW_MAPPINGS: { [key: string]: string[] } = {
    'benchmark-case1': [
      // Case 1 Circularity files
      'c1g1l1_circularity.json', 'c1g2l1_circularity.json', 'c1g3l1_circularity.json',
      'c1g1l2_circularity.json', 'c1g2l2_circularity.json', 'c1g3l2_circularity.json',
      'c1g1l3_circularity.json', 'c1g2l3_circularity.json', 'c1g3l3_circularity.json',
      // Case 1 Center of Mass files
      'c1g1l1_com.json', 'c1g2l1_com.json', 'c1g3l1_com.json',
      'c1g1l2_com.json', 'c1g2l2_com.json', 'c1g3l2_com.json',
      'c1g1l3_com.json', 'c1g2l3_com.json', 'c1g3l3_com.json',
      // Case 1 Rise Velocity files
      'c1g1l1_rise_velocity.json', 'c1g2l1_rise_velocity.json', 'c1g3l1_rise_velocity.json',
      'c1g1l2_rise_velocity.json', 'c1g2l2_rise_velocity.json', 'c1g3l2_rise_velocity.json',
      'c1g1l3_rise_velocity.json', 'c1g2l3_rise_velocity.json', 'c1g3l3_rise_velocity.json',
      // Case 1 Mass files
      'c1g1l1_mass.json', 'c1g2l1_mass.json', 'c1g3l1_mass.json',
      'c1g1l2_mass.json', 'c1g2l2_mass.json', 'c1g3l2_mass.json',
      'c1g1l3_mass.json', 'c1g2l3_mass.json', 'c1g3l3_mass.json',
      // Case 1 Shape files
      'c1g1l5s.json', 'c1g2l1s.json', 'c1g3s.json',
      'c1g1l6s.json', 'c1g2l2s.json'
    ],
    'benchmark-case2': [
      // Case 2 Shape files
      'c2g1l8s.json', 'c2g2l2s.json', 'c2g3l4s.json',
      // Case 2 Circularity files
      'c2g1l4_circularity.json', 'c2g1l5_circularity.json', 'c2g1l6_circularity.json',
      'c2g2l1_circularity.json', 'c2g2l2_circularity.json', 'c2g2l3_circularity.json',
      'c2g3l2_circularity.json', 'c2g3l3_circularity.json', 'c2g3l4_circularity.json',
      // Case 2 Center of Mass files
      'c2g1l4_com.json', 'c2g1l5_com.json', 'c2g1l6_com.json',
      'c2g2l1_com.json', 'c2g2l2_com.json', 'c2g2l3_com.json',
      'c2g3l2_com.json', 'c2g3l3_com.json', 'c2g3l4_com.json',
      // Case 2 Rise Velocity files
      'c2g1l4_rise_vel.json', 'c2g1l5_rise_vel.json', 'c2g1l6_rise_vel.json',
      'c2g2l1_rise_vel.json', 'c2g2l2_rise_vel.json', 'c2g2l3_rise_vel.json',
      'c2g3l2_rise_vel.json', 'c2g3l3_rise_vel.json',
      // Case 2 Bubble Mass files
      'c2g1l4_bubble_mass.json', 'c2g1l5_bubble_mass.json', 'c2g1l6_bubble_mass.json',
      'c2g2l1_bubble_mass.json', 'c2g2l2_bubble_mass.json', 'c2g2l3_bubble_mass.json',
      'c2g3l2_bubble_mass.json', 'c2g3l3_bubble_mass.json',
      // FeatFlow files
      'ff_circularityL1.json', 'ff_circularityL2.json', 'ff_circularityL3.json',
      'ff_bubbleMassL1.json', 'ff_bubbleMassL2.json', 'ff_bubbleMassL3.json',
      // Additional Case 2 Shape files
      'c2g1l6s.json', 'c2g2l1s.json', 'c2g1l7s.json', 'c2g2l3s.json',
      // Downsampled Bubble Shape files
      'down_bubbleShapeL1.json', 'down_bubbleShapeL2.json', 'down_bubbleShapeL3.json'
    ],
    'rising-bubble-3d': [
      // Rising Bubble 3D files
      'RB3sphericityL1.json', 'RB3sphericityL2.json', 'RB3sphericityL3.json',
      'RB3bubble_massL1.json', 'RB3bubble_massL2.json', 'RB3bubble_massL3.json',
      'RB3sizeL1.json', 'RB3sizeL2.json', 'RB3sizeL3.json',
      'RB3surfaceL1.json', 'RB3surfaceL2.json', 'RB3surfaceL3.json'
    ]
  };

  constructor(private http: HttpClient) { }

  /**
   * Get data for a specific view by loading all associated files
   * @param viewName - The view identifier (e.g., 'benchmark-case1')
   * @returns Observable<object> - Single object with all file data keyed by filename
   */
  getViewData(viewName: string): Observable<any> {
    // Get the array of filenames associated with this view
    const fileList = this.VIEW_MAPPINGS[viewName];  // Type: string[]
    
    // Guard clause: return error observable if view doesn't exist
    if (!fileList) {
      // of() creates an Observable that emits this error object once and completes
      return of({ error: `View '${viewName}' not found` });
    }
  
    // Transform each filename (string) into an Observable<any>
    // This is JavaScript's Array.map() - NOT RxJS map()
    const fileRequests = fileList.map(filename => 
      // Each filename becomes an Observable that loads and transforms the file
      this.loadFile(filename).pipe(  // Returns Observable<any> (raw file data)
        
        // RxJS map() transforms each emitted value through the Observable chain
        // Input: raw file data from loadFile()
        // Output: object with computed key { "filename_without_json": fileData }
        map(data => ({ 
          [this.getBaseFileName(filename)]: data  // Computed property name syntax
        })),
        
        // catchError() handles any errors and converts them to regular emissions
        // This prevents one failed file from breaking the entire operation
        // of() converts the error object into an Observable emission
        catchError(error => of({ 
          [this.getBaseFileName(filename)]: { error: `File not found: ${filename}` } 
        }))
      )
    );
    // Result: fileRequests is Observable<any>[] (array of Observables)
  
    // forkJoin() takes an array of Observables and returns a single Observable
    // that emits an array of all results when ALL observables complete
    // Type transformation: Observable<any>[] → Observable<any[]>
    return forkJoin(fileRequests).pipe(
      
      // RxJS map() transforms the emitted array into a single merged object
      // Input: array of objects like [{ "file1": data1 }, { "file2": data2 }, ...]
      // Output: single object like { "file1": data1, "file2": data2, ... }
      map(results => {
        // Array.reduce() accumulates/merges all objects into one
        // acc = accumulated result (starts as empty object {})
        // curr = current array element (object with one key-value pair)
        // {...acc, ...curr} = spread operator merges objects
        return results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      })
    );
    // Final result: Observable<object> with all file data keyed by filename
  }

  /**
   * Get multiple files by their names
   */
  getMultipleFiles(fileNames: string[]): Observable<any> {
    const fileRequests = fileNames.map(filename => 
      this.loadFile(filename).pipe(
        catchError(error => of({ error: `File not found: ${filename}` }))
      )
    );

    return forkJoin(fileRequests);
  }

  /**
   * Get a single file by name
   */
  getFile(fileName: string): Observable<any> {
    return this.loadFile(fileName);
  }

  /**
   * Load a single file from assets
   */
  private loadFile(filename: string): Observable<any> {
    const url = `assets/data/${filename}`;
    return this.http.get(url);
  }

  /**
   * Get base filename without .json extension
   */
  private getBaseFileName(filename: string): string {
    return filename.replace('.json', '');
  }
}