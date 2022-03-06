import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {MatDividerModule} from '@angular/material/divider';
import { BenchmarkBubble3Component } from './components/benchmark-bubble3/benchmark-bubble3.component';
import { BenchmarkFacComponent } from './components/benchmark-fac/benchmark-fac.component';

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
    BenchmarkFacComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
