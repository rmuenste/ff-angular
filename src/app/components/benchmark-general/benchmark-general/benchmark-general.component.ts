import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-benchmark-general',
  templateUrl: './benchmark-general.component.html',
  styleUrls: ['./benchmark-general.component.scss']
})
export class BenchmarkGeneralComponent implements OnInit {
  @Input() benchmarkId!: number; // Input variable

  constructor(private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.benchmarkId = +params['benchmarkId'];
    })
  }

}
