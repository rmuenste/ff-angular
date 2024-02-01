import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-benchmarks-main',
  templateUrl: './benchmarks-main.component.html',
  styleUrls: ['./benchmarks-main.component.scss']
})
export class BenchmarksMainComponent implements OnInit {

  yourMathExpression = 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}';

  constructor() { }

  ngOnInit(): void {
  }

}
