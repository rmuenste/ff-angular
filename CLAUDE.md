# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development Server

Run the Angular development server:
```bash
ng serve
```
Navigate to `http://localhost:4200/` to view the application.

### JSON Backend Server

The application requires a backend server running on port 3000 to serve JSON data. Two implementations are provided in the `server` directory:

**Node.js implementation**:
```bash
cd server
node server.js
```

**Python (FastAPI) implementation**:
```bash
cd server
# Activate virtual environment if needed
# source env/bin/activate
uvicorn server:app --reload
```

Both implementations serve JSON data from the `server/data` directory.

### Build

Build the project:
```bash
ng build
```
Build artifacts will be stored in the `dist/` directory.

### Testing

Run unit tests:
```bash
ng test
```
Tests are executed via Karma.

### Code Generation

Generate Angular components, services, etc.:
```bash
ng generate component component-name
# Also supports: directive|pipe|service|class|guard|interface|enum|module
```

## Architecture Overview

This is an Angular (v13.1.0) application for visualizing benchmark data with the following key aspects:

1. **Main Framework & Libraries**:
   - Angular Material for UI components
   - Plotly.js for data visualization/charts
   - ngx-charts for additional charting capabilities
   - Angular Flex Layout for responsive layouts

2. **Core Architecture**:
   - Angular Single Page Application with routing
   - Component-based UI architecture
   - Services for data handling and backend communication
   - JSON-based data interchange with backend

3. **Key Components**:
   - Benchmark visualization components (benchmark-bubble2, benchmark-bubble3, benchmark-example, etc.)
   - Comparative plot components for data visualization
   - Mathjax component for rendering mathematical equations
   - Shape plotting components for bubble visualization

4. **Data Flow**:
   - JSON data is served by a simple backend (Node.js or Python/FastAPI)
   - The PostService handles HTTP requests to the backend
   - DataService processes and transforms data for visualization
   - Components request data via services and render visualizations

5. **Backend**:
   - Simple REST API serving JSON files from the `server/data` directory
   - Supports single file requests and batch file requests
   - Both Node.js and Python implementations provided

6. **File Organization**:
   - `src/app/components`: UI components organized by feature
   - `src/app/services`: Angular services for data handling
   - `src/app/models`: Data models and interfaces
   - `server`: Backend implementations and data files
   - `src/assets`: Static assets like images and files

## Working with JSON Data

The application relies heavily on JSON data files in the `server/data` directory, which are loaded through the backend API. The naming convention for these files follows patterns like:

- `cXgYlZ_[metric].json`: Case X, Group Y, Level Z for a specific metric (circularity, mass, com, etc.)
- `ff_[metric]LZ.json`: FeatFlow data for a specific metric at Level Z
- `RB3[metric]LZ.json`: Rising Bubble 3D data for a specific metric at Level Z

When fetching data, use the PostService which provides methods for requesting single or multiple JSON files.