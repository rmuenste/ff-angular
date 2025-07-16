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
import { BenchmarkDetailComponent } from './components/benchmark-detail/benchmark-detail.component';
import { BenchmarkExampleComponent } from './components/benchmark-example/benchmark-example.component';
import { MatDividerModule } from '@angular/material/divider';
import { BenchmarkBubble3Component } from './components/benchmark-bubble3/benchmark-bubble3.component';
import { BenchmarkFacComponent } from './components/benchmark-fac/benchmark-fac.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { BenchmarksMainComponent } from './components/benchmarks-main/benchmarks-main/benchmarks-main.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlotComponentComponent } from './components/plot-component/plot-component.component';
import { BenchmarkBubble2Component } from './components/benchmark-bubble2/benchmark-bubble2.component';
import { ComparativePlotComponent } from './components/comparative-plot/comparative-plot.component';
import { ShapePlotComponent } from './components/shape-plot/shape-plot.component';
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
    BenchmarkDetailComponent,
    BenchmarkExampleComponent,
    BenchmarkBubble3Component,
    BenchmarkFacComponent,
    BenchmarksMainComponent,
    PlotComponentComponent,
    BenchmarkBubble2Component,
    ComparativePlotComponent,
    ShapePlotComponent,
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
