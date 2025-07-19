import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemeService } from '../../services/theme.service';
import { ThemeName, Theme, ThemeState } from '../../models/theme.interface';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit, OnDestroy {
  currentTheme: ThemeName = 'dark';
  availableThemes: Theme[] = [];
  isSystemTheme = false;
  
  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Subscribe to theme state changes
    this.themeService.getThemeState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: ThemeState) => {
        this.currentTheme = state.currentTheme;
        this.availableThemes = state.availableThemes;
        this.isSystemTheme = state.systemThemeDetected && !state.userPreference;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Handle theme selection
   */
  onThemeChange(themeName: ThemeName): void {
    this.themeService.setTheme(themeName);
  }

  /**
   * Toggle between light and dark themes (for quick switching)
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  /**
   * Use system theme preference
   */
  useSystemTheme(): void {
    this.themeService.useSystemTheme();
  }

  /**
   * Get current theme display info
   */
  getCurrentThemeInfo(): Theme | undefined {
    return this.availableThemes.find(theme => theme.name === this.currentTheme);
  }

  /**
   * Check if a theme is currently selected
   */
  isThemeSelected(themeName: ThemeName): boolean {
    return this.currentTheme === themeName;
  }
}