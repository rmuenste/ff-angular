# FF-Web Angular Application

This is an Angular 18.2.13 application for visualizing benchmark data with interactive charts and Material Design components.

## Prerequisites

- **Node.js**: 18.19.1 or higher (Angular 18 requirement)
- **npm**: 9.2.0 or higher
- **Angular CLI**: 18.2.20 (installed globally: `npm install -g @angular/cli`)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the backend server (in a separate terminal)
cd server
node server.js
# Backend will run on http://localhost:3000

# 3. Start the Angular development server
ng serve
# Frontend will run on http://localhost:4200
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## JSON backend

The sample charts expect a small JSON-serving API running on port `3000`.  You can
start either the Node or Python version of this backend from the `server`
directory:

```bash
# Node implementation
node server.js

# Python (FastAPI) implementation
uvicorn server:app --reload
```

Both commands launch the API at `http://localhost:3000`.

## Data Source Configuration

The application can fetch data in two ways, configured in `src/environments/environment.ts`:

*   **`dataSource: 'server'`**: (Default) Fetches data from a live backend API (Node.js or Python). This is the standard mode for development and production.
*   **`dataSource: 'static'`**: Fetches data from local JSON files stored in `src/assets/data`. This mode is useful for offline development or when a backend is unavailable.

To switch between modes, edit the `dataSource` property in `src/environments/environment.ts` and `src/environments/environment.prod.ts`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

### Development Build
```bash
# Build for development (faster build, larger bundles, not optimized)
ng build --configuration=development
```

### Production Build
```bash
# Build for production (optimized, smaller bundles, ready for deployment)
ng build --configuration=production

# Or simply (production is default)
ng build
```

Build artifacts will be stored in the `dist/` directory.

### Available Build Configurations
- `development`: Fast builds for local development
- `staging`: Staging environment build
- `production`: Optimized production build (default)

## Deployment

### GitHub Pages Deployment

This project is configured for easy deployment to GitHub Pages using the `angular-cli-ghpages` package.

#### Prerequisites
1. Ensure your repository is pushed to GitHub
2. Make sure you have a clean working directory (commit any changes)

#### Deploy to GitHub Pages
```bash
# Build and deploy to GitHub Pages in one command
npx angular-cli-ghpages --dir=dist/new-material

# Or if you want to specify a custom message
npx angular-cli-ghpages --dir=dist/new-material --message="Deploy latest version"

# Deploy to a specific branch (default is gh-pages)
npx angular-cli-ghpages --dir=dist/new-material --branch=gh-pages
```

#### Full Deployment Workflow
```bash
# 1. Build the application for production
ng build --configuration=production

# 2. Deploy to GitHub Pages
npx angular-cli-ghpages --dir=dist/new-material

# 3. Your app will be available at: https://[username].github.io/[repository-name]
```

#### GitHub Pages Configuration
After deployment, your app will be available at:
- **GitHub Pages URL**: `https://[your-username].github.io/[repository-name]`
- **Branch**: The deployment creates/updates a `gh-pages` branch
- **Base Href**: The tool automatically sets the correct base href for GitHub Pages

#### Deployment Options
```bash
# Deploy with custom commit message
npx angular-cli-ghpages --dir=dist/new-material --message="Release v1.0.0"

# Deploy to a different repository
npx angular-cli-ghpages --dir=dist/new-material --repo=https://github.com/username/other-repo.git

# Dry run (preview what will be deployed without actually deploying)
npx angular-cli-ghpages --dir=dist/new-material --dry-run
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Available Scripts

The following npm scripts are available in `package.json`:

```bash
npm start           # Start development server (ng serve)
npm run build       # Build for production (ng build)
npm run watch       # Build in watch mode for development
npm test            # Run unit tests
```

## Technology Stack

- **Frontend**: Angular 18.2.13
- **UI Framework**: Angular Material 18.2.14
- **Charts**: Plotly.js 3.0.1
- **Styling**: SCSS with custom theming
- **Testing**: Jasmine + Karma
- **Build Tool**: Angular CLI 18.2.20
- **Backend**: Node.js/Express or Python/FastAPI

## Project Structure

```
src/
├── app/
│   ├── components/          # Angular components
│   ├── services/           # Data services
│   └── app.module.ts       # Main module
├── themes/                 # Custom Material themes
├── assets/                # Static assets
└── environments/          # Environment configurations

server/                    # Backend implementations
├── server.js             # Node.js backend
└── server.py             # Python/FastAPI backend
```

## Further Help

- **Angular CLI**: `ng help` or [Angular CLI Overview](https://angular.io/cli)
- **Angular Material**: [Material Design Components](https://material.angular.io/)
- **Plotly.js**: [Plotly JavaScript Documentation](https://plotly.com/javascript/)
