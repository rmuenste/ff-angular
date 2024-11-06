
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  dataArray: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const fileNames = ['sample1', 'sample2', 'sample3']; // Replace with actual filenames

    this.http.post<any[]>('http://localhost:3000/get-multiple-json', { fileNames }).subscribe(
      (response) => {
        this.dataArray = response;
        console.log(this.dataArray);
        // Now use this dataArray to render multiple Plotly charts or process the data as needed
      },
      (error) => console.error(error)
    );
  }

}

