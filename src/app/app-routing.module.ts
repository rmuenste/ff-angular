import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Benchmark2DRisingBubbleComponent } from './components/benchmark-2d-rising-bubble/benchmark-2d-rising-bubble.component';
import { BenchmarksComponent } from './components/benchmarks/benchmarks.component';
import { BenchmarkBubble3Component } from './components/benchmark-bubble3/benchmark-bubble3.component';
import { MainComponent } from './components/main/main.component';
import { BenchmarkFacComponent } from './components/benchmark-fac/benchmark-fac.component';
import { BenchmarksMainComponent } from './components/benchmarks-main/benchmarks-main/benchmarks-main.component';
import { BenchmarkParticleSedimentationComponent } from './components/benchmark-particle-sedimentation/benchmark-particle-sedimentation.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {
    path: 'benchmarks',
    component: BenchmarksComponent,
    children: [
      {
        path: '',
        component: BenchmarksMainComponent
      },
      {
        path: '2d-rising-bubble',
        component: Benchmark2DRisingBubbleComponent
      },
      {
        path: 'bubble3',
        component: BenchmarkBubble3Component
      },
      {
        path: 'fac3',
        component: BenchmarkFacComponent
      },
      {
        path: 'particle-sedimentation',
        component: BenchmarkParticleSedimentationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
