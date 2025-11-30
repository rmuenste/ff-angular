# Project TODO List

This list tracks the next development priorities. For a full overview of the project's status, see `PROJECT_STATUS.md`.

---

### 🔴 Critical (Highest Priority)

- [ ] **Restore Unit Test Coverage:** The project currently has almost no unit tests. This is a critical regression that must be addressed before any new features are added.
    -   **Action:** Re-create unit tests for all major components and services.
    -   **Goal:** Achieve >80% test coverage.

### 🟠 High Priority

- [ ] **Refactor Monolithic `DataService`:** The `DataService` violates the single-responsibility principle.
    -   **Action:** Separate data transformation logic from presentation (layout) logic. Move layout configuration into the components that use the plots.

- [ ] **Introduce State Management:** The app lacks a central store, making state management difficult.
    -   **Action:** Evaluate and implement a state management library like NgRx or Elf.

### 🟡 Medium Priority

- [ ] **Complete Angular v20 Upgrade:** The project is currently on v18.
    -   **Action:** Follow the `ANGULAR_VERSION_UPDATE_PLAN.md` to upgrade to v19 and v20.


### ⚪️ Low Priority

- [ ] **Improve Test Output Readability:** The Karma test reporter can be improved.
    -   **Action:** Install and configure `karma-spec-reporter` to provide cleaner test result summaries in the console.
