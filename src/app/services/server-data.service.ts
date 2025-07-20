import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../../services/post.service';
import { IDataService } from './interfaces/data-service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService implements IDataService {

  constructor(private postService: PostService) { }

  /**
   * Get data for a specific view using the server API
   */
  getViewData(viewName: string): Observable<any> {
    return this.postService.postViewData(viewName);
  }

  /**
   * Get multiple files using the server API
   */
  getMultipleFiles(fileNames: string[]): Observable<any> {
    return this.postService.postMultiFileRequestV2(fileNames);
  }

  /**
   * Get a single file using the server API
   */
  getFile(fileName: string): Observable<any> {
    return this.postService.postFileRequest(fileName);
  }
}