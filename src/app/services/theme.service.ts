import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeName, Theme, ThemeState, ThemeColors } from '../models/theme.interface';
import { 
  AVAILABLE_THEMES, 
  DEFAULT_THEME, 
  CSS_VARIABLES_MAP, 
  THEME_STORAGE_KEY,
  THEME_COLORS 
} from '../config/themes.config';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeState$ = new BehaviorSubject<ThemeState>({
    currentTheme: DEFAULT_THEME,
    availableThemes: AVAILABLE_THEMES,
    systemThemeDetected: false,
    userPreference: null
  });

  constructor() {
    this.initializeTheme();
  }

  /**
   * Get current theme state as observable
   */
  getThemeState(): Observable<ThemeState> {
    return this.themeState$.asObservable();
  }

  /**
   * Get current theme name
   */
  getCurrentTheme(): ThemeName {
    return this.themeState$.value.currentTheme;
  }

  /**
   * Get available themes
   */
  getAvailableThemes(): Theme[] {
    return AVAILABLE_THEMES;
  }

  /**
   * Switch to a specific theme
   */
  setTheme(themeName: ThemeName): void {
    const theme = AVAILABLE_THEMES.find(t => t.name === themeName);
    if (!theme) {
      console.warn(`Theme "${themeName}" not found. Available themes:`, AVAILABLE_THEMES.map(t => t.name));
      return;
    }

    // Update CSS variables
    this.applyCSSVariables(theme.colors);
    
    // Save to localStorage
    this.saveThemePreference(themeName);
    
    // Update state
    const currentState = this.themeState$.value;
    this.themeState$.next({
      ...currentState,
      currentTheme: themeName,
      userPreference: themeName
    });

    console.log(`Theme switched to: ${theme.displayName}`);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const current = this.getCurrentTheme();
    const newTheme: ThemeName = current === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Detect and apply system theme preference
   */
  detectSystemTheme(): ThemeName {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return DEFAULT_THEME;
  }

  /**
   * Listen for system theme changes
   */
  watchSystemTheme(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', (e) => {
        const currentState = this.themeState$.value;
        
        // Only auto-switch if user hasn't set a manual preference
        if (!currentState.userPreference) {
          const systemTheme = e.matches ? 'dark' : 'light';
          this.setTheme(systemTheme);
          
          // Update state to reflect system detection
          this.themeState$.next({
            ...this.themeState$.value,
            systemThemeDetected: true,
            userPreference: null // Clear user preference since we're following system
          });
        }
      });
    }
  }

  /**
   * Reset to system theme (clear user preference)
   */
  useSystemTheme(): void {
    const systemTheme = this.detectSystemTheme();
    this.clearThemePreference();
    this.setTheme(systemTheme);
    
    // Update state
    const currentState = this.themeState$.value;
    this.themeState$.next({
      ...currentState,
      systemThemeDetected: true,
      userPreference: null
    });
  }

  /**
   * Initialize theme on service startup
   */
  private initializeTheme(): void {
    // Always start with a default theme to ensure CSS variables are set
    this.applyCSSVariables(THEME_COLORS[DEFAULT_THEME]);
    
    const savedTheme = this.loadThemePreference();
    
    if (savedTheme) {
      // User has a saved preference
      this.setTheme(savedTheme);
    } else {
      // Use system theme
      const systemTheme = this.detectSystemTheme();
      this.applyCSSVariables(THEME_COLORS[systemTheme]);
      
      this.themeState$.next({
        ...this.themeState$.value,
        currentTheme: systemTheme,
        systemThemeDetected: true
      });
    }

    // Start watching for system theme changes
    this.watchSystemTheme();
  }

  /**
   * Apply theme colors to CSS custom properties
   */
  private applyCSSVariables(colors: ThemeColors): void {
    const root = document.documentElement;
    
    Object.entries(CSS_VARIABLES_MAP).forEach(([colorKey, cssVar]) => {
      const colorValue = colors[colorKey as keyof ThemeColors];
      root.style.setProperty(cssVar, colorValue);
    });
  }

  /**
   * Save theme preference to localStorage
   */
  private saveThemePreference(theme: ThemeName): void {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }

  /**
   * Load theme preference from localStorage
   */
  private loadThemePreference(): ThemeName | null {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
      return AVAILABLE_THEMES.some(t => t.name === saved) ? saved : null;
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
      return null;
    }
  }

  /**
   * Clear theme preference from localStorage
   */
  private clearThemePreference(): void {
    try {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear theme preference:', error);
    }
  }
}