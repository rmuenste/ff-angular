export type ThemeName = 'light' | 'dark' | 'custom';

export interface ThemeColors {
  primaryColor: string;
  primaryLighter: string;
  primaryDarker: string;
  accentColor: string;
  warnColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  dividerColor: string;
  textOnPrimary: string;
  textOnAccent: string;
}

export interface Theme {
  name: ThemeName;
  displayName: string;
  description: string;
  icon: string;
  colors: ThemeColors;
}

export interface ThemeState {
  currentTheme: ThemeName;
  availableThemes: Theme[];
  systemThemeDetected: boolean;
  userPreference: ThemeName | null;
}