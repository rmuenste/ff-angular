import { Theme, ThemeName } from '../models/theme.interface';

// Theme color definitions that match our SCSS theme files
export const THEME_COLORS = {
  light: {
    primaryColor: '#8bc34a',      // Light green 500
    primaryLighter: '#aed581',    // Light green 300  
    primaryDarker: '#689f38',     // Light green 700
    accentColor: '#ff5722',       // Deep orange 500
    warnColor: '#f44336',         // Red 500
    backgroundColor: '#fafafa',   // Light background
    surfaceColor: '#ffffff',      // White surface
    textPrimary: 'rgba(0, 0, 0, 0.87)',
    textSecondary: 'rgba(0, 0, 0, 0.6)',
    textDisabled: 'rgba(0, 0, 0, 0.38)',
    dividerColor: 'rgba(0, 0, 0, 0.12)',
    textOnPrimary: '#ffffff',                  // White text on green (User preference)
    textOnPrimaryRgb: '255, 255, 255',         // RGB components for rgba()
    textOnAccent: 'rgba(255, 255, 255, 0.87)', // White text on orange
    textOnAccentRgb: '255, 255, 255',          // RGB components for rgba()
  },
  dark: {
    primaryColor: '#8bc34a',      // Light green 500 (same as light)
    primaryLighter: '#aed581',    // Light green 300
    primaryDarker: '#689f38',     // Light green 700  
    accentColor: '#ff5722',       // Deep orange 500
    warnColor: '#f44336',         // Red 500
    backgroundColor: '#303030',   // Dark background
    surfaceColor: '#424242',      // Dark surface
    textPrimary: 'rgba(255, 255, 255, 0.87)',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textDisabled: 'rgba(255, 255, 255, 0.38)',
    dividerColor: 'rgba(255, 255, 255, 0.12)',
    textOnPrimary: 'rgba(0, 0, 0, 0.87)',      // Black text on green
    textOnPrimaryRgb: '0, 0, 0',               // RGB components for rgba()
    textOnAccent: 'rgba(255, 255, 255, 0.87)', // White text on orange
    textOnAccentRgb: '255, 255, 255',          // RGB components for rgba()
  },
  custom: {
    primaryColor: '#3f51b5',      // Indigo 500
    primaryLighter: '#7986cb',    // Indigo 300
    primaryDarker: '#303f9f',     // Indigo 700
    accentColor: '#e91e63',       // Pink 500  
    warnColor: '#f44336',         // Red 500
    backgroundColor: '#1a1a2e',   // Custom dark blue background
    surfaceColor: '#16213e',      // Custom dark blue surface
    textPrimary: 'rgba(255, 255, 255, 0.87)',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textDisabled: 'rgba(255, 255, 255, 0.38)',
    dividerColor: 'rgba(255, 255, 255, 0.12)',
    textOnPrimary: 'rgba(255, 255, 255, 0.87)', // White text on indigo
    textOnPrimaryRgb: '255, 255, 255',          // RGB components for rgba()
    textOnAccent: 'rgba(255, 255, 255, 0.87)',  // White text on pink
    textOnAccentRgb: '255, 255, 255',           // RGB components for rgba()
  }
} as const;

export const AVAILABLE_THEMES: Theme[] = [
  {
    name: 'light',
    displayName: 'Light',
    description: 'Clean light theme with green accents',
    icon: 'light_mode',
    colors: THEME_COLORS.light
  },
  {
    name: 'dark', 
    displayName: 'Dark',
    description: 'Dark theme with green accents (default)',
    icon: 'dark_mode',
    colors: THEME_COLORS.dark
  },
  {
    name: 'custom',
    displayName: 'Custom',
    description: 'Custom dark theme with indigo and pink',
    icon: 'palette',
    colors: THEME_COLORS.custom
  }
];

export const DEFAULT_THEME: ThemeName = 'dark';

// CSS custom property mapping
export const CSS_VARIABLES_MAP = {
  primaryColor: '--primary-color',
  primaryLighter: '--primary-lighter', 
  primaryDarker: '--primary-darker',
  accentColor: '--accent-color',
  warnColor: '--warn-color',
  backgroundColor: '--background-color',
  surfaceColor: '--surface-color',
  textPrimary: '--text-primary',
  textSecondary: '--text-secondary',
  textDisabled: '--text-disabled',
  dividerColor: '--divider-color',
  textOnPrimary: '--text-on-primary',
  textOnPrimaryRgb: '--text-on-primary-rgb',
  textOnAccent: '--text-on-accent',
  textOnAccentRgb: '--text-on-accent-rgb'
} as const;

// Storage key for localStorage
export const THEME_STORAGE_KEY = 'ff-angular-theme-preference';