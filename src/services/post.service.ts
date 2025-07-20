import { Injectable } from '@angular/core';
// post.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = environment.api.endpoints.posts;
  private apiUrl2 = environment.api.baseUrl;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  postFileRequest(fileName: string): Observable<any> {
    const url = `${this.apiUrl2}${environment.api.endpoints.getJson}`;
    const payload = { fileName };
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});

    return this.http.post<any>(url, payload, { headers });
  }

  postMultiFileRequest(fileNames: Array<String>): Observable<any> {
    const url = `${this.apiUrl2}${environment.api.endpoints.getMultipleJson}`;
    const payload = { fileNames };
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});

    return this.http.post<any>(url, payload, { headers });
  }

  postMultiFileRequestV2(fileNames: Array<string>): Observable<any> {
    const url = `${this.apiUrl2}${environment.api.endpoints.getMultipleJsonV2}`;
    const payload = { fileNames };
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    console.log('postMultiFileRequestV2 payload:', payload);
    return this.http.post<any>(url, payload, { headers });
  }

  postViewData(viewName: string): Observable<any> {
    const url = `${this.apiUrl2}${environment.api.endpoints.getViewData}`;
    const payload = { view_name: viewName };
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    console.log('postViewData request:', payload);
    return this.http.post<any>(url, payload, { headers });
  }
}
