import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-benchmarks',
  templateUrl: './benchmarks.component.html',
  styleUrls: ['./benchmarks.component.scss']
})
export class BenchmarksComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  private sidenavSubscription!: Subscription;

  constructor(private breakpointObserver: BreakpointObserver, private sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.sidenavSubscription = this.sidenavService.isSidenavOpen$.subscribe(isOpen => {
      if (isOpen) {
        this.drawer?.open();
      } else {
        this.drawer?.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.sidenavSubscription.unsubscribe();
  }

  onRouterLinkActive(e: any) {
    console.log("active");
  }

  closeSidenavOnMobile(): void {
    this.isHandset$.subscribe(isHandset => {
      if (isHandset) {
        this.sidenavService.setSidenav(false);
      }
    });
  }
}
