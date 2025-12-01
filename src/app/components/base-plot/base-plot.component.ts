import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { ThemeName } from '../../models/theme.interface';

@Component({
  selector: 'app-base-plot',
  templateUrl: './base-plot.component.html',
  styleUrls: ['./base-plot.component.scss']
})
export class BasePlotComponent implements OnInit, OnDestroy, OnChanges {
  @Input() data: any[] = [];
  @Input() layout: any = {};
  @Input() config: any = {};
  @Input() useResizeHandler: boolean = true;

  // This will be the actual layout object passed to plotly
  public plotLayout: any = {};
  private themeSubscription: Subscription = new Subscription();
  private currentTheme: ThemeName = 'dark';

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.getThemeState().subscribe(state => {
      this.currentTheme = state.currentTheme;
      this.updateLayout();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['layout']) {
      this.updateLayout();
    }
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  private updateLayout(): void {
    const isDark = this.currentTheme === 'dark' || this.currentTheme === 'custom';
    
    // Define theme-specific style overrides
    const themeStyles = {
      paper_bgcolor: 'rgba(0,0,0,0)', // Transparent to let container background show
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: {
        color: isDark ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)'
      },
      xaxis: {
        gridcolor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
        zerolinecolor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'
      },
      yaxis: {
        gridcolor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
        zerolinecolor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'
      }
    };

    // Deep merge the input layout with theme styles
    // We create a new object to trigger change detection in plotly-plot
    this.plotLayout = {
      ...this.layout,
      paper_bgcolor: themeStyles.paper_bgcolor,
      plot_bgcolor: themeStyles.plot_bgcolor,
      font: {
        ...this.layout.font,
        color: themeStyles.font.color
      },
      title: {
        ...(typeof this.layout.title === 'string' ? { text: this.layout.title } : this.layout.title),
        font: {
          ...this.layout.title?.font,
          color: themeStyles.font.color
        }
      },
      xaxis: {
        ...this.layout.xaxis,
        gridcolor: themeStyles.xaxis.gridcolor,
        zerolinecolor: themeStyles.xaxis.zerolinecolor,
        color: themeStyles.font.color,
        title: {
          ...(typeof this.layout.xaxis?.title === 'string' ? { text: this.layout.xaxis.title } : this.layout.xaxis?.title),
          font: {
            ...this.layout.xaxis?.title?.font,
            color: themeStyles.font.color
          }
        }
      },
      yaxis: {
        ...this.layout.yaxis,
        gridcolor: themeStyles.yaxis.gridcolor,
        zerolinecolor: themeStyles.yaxis.zerolinecolor,
        color: themeStyles.font.color,
        title: {
          ...(typeof this.layout.yaxis?.title === 'string' ? { text: this.layout.yaxis.title } : this.layout.yaxis?.title),
          font: {
            ...this.layout.yaxis?.title?.font,
            color: themeStyles.font.color
          }
        }
      },
      // Ensure legend text is also colored correctly
      legend: {
        ...this.layout.legend,
        font: {
          ...this.layout.legend?.font,
          color: themeStyles.font.color
        }
      }
    };
  }
}