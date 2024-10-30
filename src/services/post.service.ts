import { Injectable } from '@angular/core';
// post.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private apiUrl2 = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  postFileRequest(fileName: string): Observable<any> {
    const url = `${this.apiUrl2}/get-json`;
    const payload = { fileName };
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});

    return this.http.post<any>(url, payload, { headers });
  }
}
