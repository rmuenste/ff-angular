import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenchmarkExampleComponent } from './components/benchmark-example/benchmark-example.component';
import { BenchmarksComponent } from './components/benchmarks/benchmarks.component';
import { BenchmarkBubble3Component } from './components/benchmark-bubble3/benchmark-bubble3.component';
import { MainComponent } from './components/main/main.component';
import { BenchmarkFacComponent } from './components/benchmark-fac/benchmark-fac.component';
import { BenchmarksMainComponent } from './components/benchmarks-main/benchmarks-main/benchmarks-main.component';

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
        path: 'bubble2',
        component: BenchmarkExampleComponent
      },
      {
        path: 'bubble3',
        component: BenchmarkBubble3Component
      },
      {
        path: 'fac3',
        component: BenchmarkFacComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
