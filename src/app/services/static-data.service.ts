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
   */
  getViewData(viewName: string): Observable<any> {
    const fileList = this.VIEW_MAPPINGS[viewName];
    
    if (!fileList) {
      return of({ error: `View '${viewName}' not found` });
    }

    // Load all files for this view
    const fileRequests = fileList.map(filename => 
      this.loadFile(filename).pipe(
        map(data => ({ [this.getBaseFileName(filename)]: data })),
        catchError(error => of({ [this.getBaseFileName(filename)]: { error: `File not found: ${filename}` } }))
      )
    );

    // Combine all file requests
    return forkJoin(fileRequests).pipe(
      map(results => {
        // Merge all results into a single object
        return results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      })
    );
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