import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { BenchmarksComponent } from './components/benchmarks/benchmarks.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { MathjaxComponent } from './components/mathjax/mathjax.component';
import { Benchmark2DRisingBubbleComponent } from './components/benchmark-2d-rising-bubble/benchmark-2d-rising-bubble.component';
import { MatDividerModule } from '@angular/material/divider';
import { Benchmark3DRisingBubbleComponent } from './components/benchmark-3d-rising-bubble/benchmark-3d-rising-bubble.component';
import { BenchmarkFacComponent } from './components/benchmark-fac/benchmark-fac.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { BenchmarksMainComponent } from './components/benchmarks-main/benchmarks-main/benchmarks-main.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BasePlotComponent } from './components/base-plot/base-plot.component';
import { LevelSelectionPlotComponent } from './components/level-selection-plot/level-selection-plot.component';
import { FilterablePlotComponent } from './components/filterable-plot/filterable-plot.component';
import { BenchmarkParticleSedimentationComponent } from './components/benchmark-particle-sedimentation/benchmark-particle-sedimentation.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BenchmarksComponent,
    MainComponent,
    FooterComponent,
    MathjaxComponent,
    Benchmark2DRisingBubbleComponent,
    Benchmark3DRisingBubbleComponent,
    BenchmarkFacComponent,
    BenchmarksMainComponent,
    BasePlotComponent,
    LevelSelectionPlotComponent,
    FilterablePlotComponent,
    BenchmarkParticleSedimentationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatFormFieldModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    NgxChartsModule,
    HttpClientModule,
    MatSelectModule,
    PlotlyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
