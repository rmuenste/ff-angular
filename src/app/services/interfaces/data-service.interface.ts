import { Observable } from 'rxjs';

export interface IDataService {
  /**
   * Get data for a specific view
   * @param viewName The name of the view (e.g., 'rising-bubble-3d', 'benchmark-case1')
   * @returns Observable containing the view data
   */
  getViewData(viewName: string): Observable<any>;

  /**
   * Get multiple files by their names
   * @param fileNames Array of file names to retrieve
   * @returns Observable containing the file data
   */
  getMultipleFiles(fileNames: string[]): Observable<any>;

  /**
   * Get a single file by name
   * @param fileName The name of the file to retrieve
   * @returns Observable containing the file data
   */
  getFile(fileName: string): Observable<any>;
}

export type DataSourceType = 'server' | 'static';