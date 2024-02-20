import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BenchmarkData } from 'src/app/models/benchmark-data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-benchmark-general',
  templateUrl: './benchmark-general.component.html',
  styleUrls: ['./benchmark-general.component.scss']
})
export class BenchmarkGeneralComponent implements OnInit {
  @Input() benchmarkId!: number; // Input variable

  benchData: BenchmarkData;

  constructor(private route: ActivatedRoute, private dataService: DataService ) {
    this.benchData  = {
      id: -1,
      name: "Name",
      introduction: {innerHTML: "<h1>Hello</h1>"},
      definition: {innerHTML: "<h1>Hello</h1>"},
      results: {innerHTML: "<h1>Hello</h1>"},
      referenceData: {innerHTML: "<h1>Hello</h1>"}
    }

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.benchmarkId = parseInt(params['benchmarkId']);
      console.log(`Benchmark id ${this.benchmarkId}`)
      this.benchData = this.dataService.getBenchmarkData(this.benchmarkId);
    })
  }

}
