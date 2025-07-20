import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { HttpClientModule } from '@angular/common/http';
import { BenchmarksComponent } from './components/benchmarks/benchmarks.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { MathjaxComponent } from './components/mathjax/mathjax.component';
import { Benchmark2DRisingBubbleComponent } from './components/benchmark-2d-rising-bubble/benchmark-2d-rising-bubble.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Benchmark3DRisingBubbleComponent } from './components/benchmark-3d-rising-bubble/benchmark-3d-rising-bubble.component';
import { BenchmarkFacComponent } from './components/benchmark-fac/benchmark-fac.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { BenchmarksMainComponent } from './components/benchmarks-main/benchmarks-main/benchmarks-main.component';
import { BasePlotComponent } from './components/base-plot/base-plot.component';
import { LevelSelectionPlotComponent } from './components/level-selection-plot/level-selection-plot.component';
import { FilterablePlotComponent } from './components/filterable-plot/filterable-plot.component';
import { BenchmarkParticleSedimentationComponent } from './components/benchmark-particle-sedimentation/benchmark-particle-sedimentation.component';
import { DATA_SERVICE_PROVIDER } from './services/data-service.factory';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

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
    ThemeSwitcherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatButtonToggleModule,
    HttpClientModule,
    MatSelectModule,
    PlotlyModule
  ],
  providers: [DATA_SERVICE_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
