# Project Status & Improvement Roadmap

This document provides a summary of the project's current state, including completed milestones and a roadmap for future improvements. It replaces the previous individual reports (`CODE_REPORT.md`, `MDC_MIGRATION_SUMMARY.md`, `SECURITY_IMPLEMENTATION_SUMMARY.md`, etc.).

## Current State

The project has undergone significant modernization efforts, moving it from a student-level prototype to a more robust foundation. Key infrastructure work, including a security overhaul and major dependency upgrades, has been completed.

However, critical gaps remain in code quality and testing, which must be addressed to ensure long-term maintainability.

---

## ✅ Completed Milestones

1.  **Security Overhaul (Complete)**
    *   **Status:** All critical backend vulnerabilities have been remediated.
    *   **Details:** Implemented a multi-layered security model including:
        *   A "view-based" API architecture to **eliminate path traversal risks**.
        *   Environment-configurable rate limiting to prevent abuse.
        *   Robust input validation and request logging.
        *   Secure environment configuration (`.env`) for the backend servers.

2.  **Angular Upgrade to v18 (In Progress)**
    *   **Status:** The application has been successfully upgraded from Angular 13 -> 15 -> 17 -> **18**.
    *   **Details:** The core framework and Angular Material have been brought up to version 18.x, resolving numerous deprecated APIs and preparing the project for future features.

3.  **Angular Material MDC Migration (Complete)**
    *   **Status:** **100% complete.**
    *   **Details:** All legacy (pre-MDC) Angular Material components have been migrated to their modern counterparts. This unblocked the Angular version upgrades and significantly reduced CSS bundle size.

4.  **Theming System Refactor (Complete)**
    *   **Status:** The core theming system has been **fixed and stabilized**.
    *   **Details:** Resolved SCSS compilation errors and implemented a clean, maintainable theming structure based on CSS Custom Properties. Light and dark themes are defined and functional.

---

## 🚩 Priority Issues & Next Steps

The following issues represent the most critical technical debt and must be prioritized.

### 🔴 Critical Priority

1.  **Restore Unit Test Coverage**
    *   **Problem:** The project's unit tests have been deleted, leaving only a single spec file for the root `AppComponent`. This is a **major regression** from the "incomplete" coverage mentioned in the original code report and poses a severe risk to stability.
    *   **Next Steps:**
        *   Re-create basic unit tests for all existing components and services.
        *   Write new tests for the security-related frontend services (`PostService`) and data view components.
        *   Establish a policy requiring tests for all new features and bug fixes.
        *   Aim for a minimum of 80% code coverage.

### 🟠 High Priority

1.  **Complete Angular v20 Upgrade**
    *   **Problem:** The upgrade is currently paused at Angular 18.
    *   **Next Steps:** Follow the `ANGULAR_VERSION_UPDATE_PLAN.md` to complete the remaining upgrades to v19 and v20.

2.  **Refactor Monolithic `DataService`**
    *   **Problem:** `src/app/services/data.service.ts` remains a monolithic service (1300+ lines) that violates the single-responsibility principle by mixing data transformation with chart layout configuration.
    *   **Next Steps:**
        *   Create separate, smaller services or helper functions for data transformations.
        *   Move chart layout and presentation logic into the respective components that use them.

3.  **Implement a State Management Solution**
    *   **Problem:** The application lacks a centralized state management solution, leading to inefficient data handling and potential state synchronization issues.
    *   **Next Steps:**
        *   Evaluate and introduce a state management library (e.g., NgRx, Akita, or Elf).
        *   Refactor components to read data from a central store instead of relying on local service state.

### 🟡 Medium Priority

1.  **Build Theme Switcher UI**
    *   **Problem:** The theming backend is ready, but there is no UI for users to switch between themes.
    *   **Next Steps:**
        *   Create a `ThemeService` to manage the currently active theme.
        *   Build a UI component (e.g., a button toggle in the navbar) to allow users to select their preferred theme.
        *   Implement theme persistence in `localStorage`.

2.  **Improve Test Readability**
    *   **Problem:** Default Karma test output can be noisy.
    *   **Next Steps:** Implement `karma-spec-reporter` as outlined in `TODO.md`.
