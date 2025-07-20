Thanks for confirming. I’ll research how to upgrade an Angular 13 project to Angular 17, focusing on using default Angular CLI settings and Angular Material, and considering this is a staging app (not yet live).

I’ll provide detailed step-by-step upgrade instructions, including compatibility updates, Angular Material guidance, and best practices to ensure a smooth transition.

I’ll get back to you shortly with the findings.


# Upgrading an Angular 13 Project to Angular 17: Step-by-Step Guide

## Preparation: Update Prerequisites

* **Node and Angular CLI:** Ensure Node.js and npm are updated to supported versions for Angular 17. Angular 16+ supports Node 16 and Node 18 (Node 18 LTS is recommended for Angular 17). Update the global Angular CLI to the latest version (`npm install -g @angular/cli@latest`) so you have Angular CLI 17 for new commands.
* **Backup and Branch:** Back up your project or use version control (e.g. create a new Git branch) before starting the upgrade. This allows you to track changes and rollback if needed.
* **Verify Current State:** Make sure your Angular 13 app is in a healthy state. All tests should be passing and there should be no pending runtime errors. This baseline will help identify issues introduced by the upgrade at each step.

## Step 1: Upgrade from Angular 13 to Angular 14

1. **Update Angular Core & CLI to v14:** In the project directory, run the Angular CLI update command targeting v14:

   ```bash
   ng update @angular/core@14 @angular/cli@14
   ```

   This will update Angular framework packages and the CLI to version 14. If you encounter peer dependency incompatibilities (the console will warn you), update those specific packages manually to compatible versions and re-run the `ng update` command. For example, Angular ESLint or other schematics might need an update.
2. **Update Angular Material to v14:** If your project uses Angular Material, update it (and Angular CDK) to v14 as well:

   ```bash
   ng update @angular/material@14 @angular/cdk@14
   ```

   Keeping Angular Material in sync with the Angular core version ensures compatibility. Angular Material 14 should not introduce breaking changes from 13, but always check the console output for any migration messages.
3. **Re-install Dependencies:** After updating package versions, it’s a good idea to get a fresh install. Delete your `package-lock.json` (and optionally `node_modules` folder) and run:

   ```bash
   npm install
   ```

   This cleans up any version mismatches and installs the Angular 14 packages cleanly.
4. **Address Angular 14 Changes:** Angular 14 introduces *optional* new features like **typed forms** and standalone component APIs, but these do not break existing code by default. For example, forms now support strict typing; you can gradually introduce those types but it’s not required for the app to run. Angular 14 also dropped IE11 support, so you can remove any IE-specific polyfills if present. Review the official Angular 14 update guide for any framework-specific notes, and fix any TypeScript errors that the upgrade might surface (e.g. if you were using deprecated APIs). In most cases, Angular 13 -> 14 is straightforward.
5. **Test the App on v14:** Run `ng serve` to compile the application with Angular 14 and ensure it starts without errors. Execute your test suite (`ng test`) to verify all unit tests still pass. Pay attention to any warnings or deprecation messages in the terminal. At this point, the app should behave as it did before. Proceed to the next step once you are confident Angular 14 is stable.

## Step 2: Upgrade from Angular 14 to Angular 15

1. **Update Angular Core & CLI to v15:** Run the update command for Angular 15:

   ```bash
   ng update @angular/core@15 @angular/cli@15
   ```

   This upgrades your project to Angular 15. Angular 15 may require an updated TypeScript version (TS 4.8+), which the CLI will handle. It also makes **Standalone Components** stable (so new projects default to standalone APIs). Your existing app can continue using NgModules, but be aware of this change for future development. Watch the console output for any automated migrations. For example, Angular 15 tightened some type checks and may point out issues that need fixing (such as stricter types in templates). Fix any such issues after the update.
2. **Update Angular Material to v15:** Now update Angular Material and CDK to 15:

   ```bash
   ng update @angular/material@15 @angular/cdk@15
   ```

   Angular Material 15 is a **major** update because it adopts the new Material Design Components (MDC) implementation for many components. The Angular CLI will run a migration that automatically switches your imports to the new *legacy* component classes to avoid breaking changes. For example, after the update you might see:

   ```ts
   // Before (v14):
   import { MatDialog } from '@angular/material/dialog';
   // After (v15 update):
   import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
   ```

   This is expected – the `MatLegacy...` components are the old implementations, now labeled as legacy. Your app will continue to use the old Material design for now, which minimizes visual disruption. The Angular team introduced these legacy aliases so that you can upgrade incrementally. **Do not** simply revert these changes; leave the imports as `MatLegacy...` unless you plan to immediately refactor to the new components.
3. **Address Material v15 Template Changes:** A few breaking changes in Angular Material templates need attention when moving to v15:

   * **Form Field Label:** The `floatLabel="never"` option on `<mat-form-field>` has been removed in v15. Use `floatLabel="always"` or omit the attribute to use the default (`"auto"`).
   * **Form Field Appearance:** The old `appearance="standard"` style is discontinued. Update your `<mat-form-field>` to use `appearance="fill"` or `appearance="outline"` which are the supported options.
   * **Tab Navigation Bar:** If you use `<nav mat-tab-nav-bar>`, the API has changed in v15. You must wrap the content in a `<mat-tab-nav-panel>` and bind it using the `[tabPanel]` property on the nav bar. For example, `<nav mat-tab-nav-bar [tabPanel]="myPanel">…</nav>` with a corresponding `<mat-tab-nav-panel #myPanel>…</mat-tab-nav-panel>` wrapping the router outlet or tab content. Update your template accordingly so that your tab nav continues to work.
     Make these template changes **before** or immediately after the update to avoid runtime errors in Angular 15.
4. **Run the MDC Migration (optional but recommended):** Angular Material v15 provides a schematic to help migrate to the new MDC-based components. When you’re ready, execute:

   ```bash
   ng generate @angular/material:mdc-migration
   ```

   This will scan your project and update component selectors, class names, and theme styles to their MDC equivalents where possible. It will also mark places that need manual intervention with `// TODO(mdc-migration)` comments in your stylesheets. For example, if you had custom CSS targeting internal classes like `.mat-form-field-flex`, after migration you’ll need to target `.mat-mdc-form-field-flex`. The schematic can perform bulk of the work, but you must **manually adjust** any styles or tests that relied on the old classes. Check your SCSS/CSS for **mdc-migration TODO** comments to identify what to update.
5. **Validate on Angular 15:** Serve the application and run the test suite on Angular 15. Because the update is using legacy Material components, your app should look and behave mostly the same after the upgrade. However, Angular Material v15’s underlying changes might still affect spacing, typography, or other subtle styling aspects (the MDC implementations have slightly different default styles). Test all critical UI flows. If you notice any design regressions that are unacceptable right now, you have two options:

   * Temporarily stick with the legacy components (as is, with the `MatLegacy...` imports) and plan to address the visual differences later. The legacy components are fully functional in v15 and v16, just deprecated.
   * Start adjusting your styles to accommodate the new MDC components (perhaps enabled via the migration schematic). This could involve tweaking CSS, updating theme definitions, etc., to match the new Material look.
     In either case, ensure the app’s functionality is intact with Angular 15. All unit tests and e2e tests should pass. Once everything looks good, proceed to the next step.

## Step 3: Upgrade from Angular 15 to Angular 16

1. **Update Angular Core & CLI to v16:** Run the update for Angular 16:

   ```bash
   ng update @angular/core@16 @angular/cli@16
   ```

   This brings your project to Angular 16. Make sure your environment meets the requirements (Angular 16 supports Node 16 or 18, and requires TypeScript \~4.9 or 5.0). The CLI will typically bump the TypeScript version for you. After the update, scan the terminal for any migration messages. Angular 16’s update may adjust your configuration files (for example, it might remove the now-obsolete `es5BrowserSupport` flag in `angular.json`, since IE11 support is gone).
2. **Update Angular Material to v16:** Update Material and CDK to v16:

   ```bash
   ng update @angular/material@16 @angular/cdk@16
   ```

   Angular Material 16 is mostly a maintenance release. It continues to support the legacy components (with the `MatLegacy*` classes), but this is the last Angular Material version that will include them. By updating to v16, you get the latest fixes and improvements. There shouldn’t be major breaking changes from Material 15 to 16, but do check the release notes for any deprecations.
3. **Address Angular 16 Breaking Changes:** Angular 16 itself introduces a few notable breaking changes that you should address:

   * **Routing Guards and Resolvers:** Angular 16 **removed support for class-based and InjectionToken-based guards/resolvers** in the Router. If your app defines route guards or resolvers as classes (e.g. services implementing `CanActivate`, or providers using `provideGuard` tokens), you need to refactor them to the new **functional guard** style. In practice, this means instead of:

     ```ts
     canActivate: [AuthGuardService]  // class-based guard
     ```

     you define:

     ```ts
     canActivate: [() => inject(AuthService).isLoggedIn() ? true : router.createUrlTree(['/login'])]
     ```

     using an inline arrow function (or a named function) that uses `inject()` to get needed services. Write your guard logic in that function and return a boolean or `UrlTree`. Do similarly for resolvers (returning the data directly or a `resolve` function). This functional API was introduced in Angular 14-15 and is now the only way forward in v16+. If you don’t refactor, your old class guards will simply never be called by the router in v16. Convert them and test your navigation flows to ensure everything still works (authentication/authorization, etc.).
   * **Removal of View Engine (NGCC):** Angular 16 completes the transition to Ivy by removing the View Engine compatibility compiler (NGCC) entirely. All libraries in your project must be built for Ivy. If you have very old third-party packages (from Angular 8 or earlier) that haven’t been updated, they will likely break now. Most libraries have long since updated, but double-check any rarely updated dependency. If something breaks at build time with missing metadata or similar errors, that’s a sign a library isn’t Ivy-compatible. You’ll need to update or replace it.
   * **Material Ripple Inputs:** Angular Material v16 removed the `disableRipple` and related ripple inputs from several components (e.g., buttons, checkboxes, slide toggles). Ripples are now always controlled by global theming or via CSS, not individual component inputs. If your templates were using `[disableRipple]` on any Material component, you’ll get a compile error. Remove those inputs or update your code to use the global ripple configuration (by importing `MatRippleModule` and configuring through theming). This change moves ripples to a private implementation detail, so you typically won’t control them at the component attribute level anymore.
   * **Dependency Updates:** Angular 16 may also require updates to other Angular-adjacent libraries. For example, if you use RxJS, ensure you’re on a version compatible with Angular 16 (likely RxJS 7.8+). The CLI update should handle RxJS if needed. Also, if using Angular ESLint, upgrade `@angular-eslint` to the latest version for Angular 16 compatibility.
4. **Optional New Features in v16:** Angular 16 introduced some great new features like **Signals** (a new reactivity model) and **Non-destructive Hydration** for SSR. These are opt-in and won’t affect your app unless you use them. You might explore signals as a replacement for `EventEmitter` or RxJS in component state, but this can be done gradually and isn’t required for the upgrade. Another feature is the built-in **View Transition API** support to easily animate route changes. Keep these enhancements in mind as you continue development, but migrating your existing code to use them is not mandatory.
5. **Test the App on v16:** Run your application and tests again. With the router guard changes, pay special attention to navigation and data loading flows – ensure that all guards and resolvers are functioning with the new approach. Also test any Material components that had ripple effects or other subtle behavior changes. The app’s functionality should otherwise remain consistent. If you still have any Angular Material legacy components in use, remember that this is the last version where those legacy APIs exist. It’s strongly recommended to finish migrating any remaining legacy Material components to their MDC equivalents at this stage (import from `@angular/material` instead of `@angular/material/legacy-*`). This will make the final step to Angular 17 much easier.

## Step 4: Upgrade from Angular 16 to Angular 17

1. **Update Angular Core & CLI to v17:** Finally, run the update for Angular 17:

   ```bash
   ng update @angular/core@17 @angular/cli@17
   ```

   This will update your project to Angular 17. Angular 17 includes some nice improvements such as the new **declarative control flow syntax** (`@if`, `@for`, etc. in templates) and **deferrable views** for lazy-loading parts of the template. These features are additive – your existing `*ngIf`/`*ngFor` will still work as is, and you can opt to use the new `@if`/`@for` syntax at your leisure. The update should also bump your TypeScript to \~5.2 (since Angular 17 supports TS 5.2) and possibly update other dependencies like RxJS to 7.8 or 7.9. Check the terminal output for any messages (for example, Angular might inform you of deprecated usages that will be removed in v18).
2. **Update Angular Material to v17:** **This is a critical step for projects using Angular Material.** Update Angular Material and CDK to v17:

   ```bash
   ng update @angular/material@17 @angular/cdk@17
   ```

   Angular Material v17 **drops support for all legacy components** – the `MatLegacy*` classes are removed from the library. If you have been using legacy imports (from the v15 update), you must now migrate fully to the MDC components. This means:

   * Change your imports to import the component classes directly from `@angular/material`. For example, replace `MatLegacyDialog` with `MatDialog` (from `@angular/material/dialog`), `MatLegacyButtonModule` with `MatButtonModule`, etc. The legacy symbols will no longer exist in v17.
   * Ensure that any styling or behavior differences are handled. The MDC components might have slightly different CSS classes and default styles. By now, if you ran the migration and addressed the TODOs in v15, you should be in good shape. If not, do a thorough review of your Material components’ styles.
   * Remove any remaining deprecated Material usage. For instance, if some component was marked deprecated in v16 (like legacy theming APIs or utility functions), switch to the recommended alternatives as those could be removed in v17.
     If you are **not** prepared to do this migration right now, there is a short-term workaround: you can continue using Angular Material v16 alongside Angular core v17. Angular 17 is compatible with Material 16, so your app will run, but you’ll get peer dependency warnings. This would allow you to upgrade the Angular framework now and tackle the Material upgrade next. **However, this is only a temporary solution.** You’d need to upgrade to Material 17 (or newer) before moving to Angular 18, and running an outdated Material version means you miss out on fixes and could encounter incompatibilities later. The best practice is to complete the Material migration and use Angular Material 17 so your project is fully up-to-date.
3. **Final Code Adjustments:** After updating to Angular 17, comb through your application for any last issues:

   * **Component Styles Cleanup:** Angular 17 introduced automatic removal of component styles from the DOM when components are destroyed. This helps avoid memory leaks and stale styles. It shouldn’t require changes from you, but be aware in case you had any workaround for style cleanup – it’s now handled by Angular.
   * **Optional Enhancements:** You can now use the new `@if/@else` and `@for` template syntax to simplify complex conditionals/loops in templates. Consider gradually refactoring templates to use these for improved readability. Also, the new View Transition API integration makes it easier to add animations when navigating between routes. If your app would benefit from that, you can look into the documentation for using the `@angular/platform-browser/animations` features with the ViewTransition. These are not required changes, just opportunities now available on Angular 17.
   * **Dependency Audit:** Check that all your third-party dependencies are on versions compatible with Angular 17. Most libraries that worked on 16 will work on 17, since there were not many breaking changes in the core framework. But update things like Angular Fire, NGX libraries, etc., to their latest versions. Also verify your TypeScript is updated as needed (the Angular update may have done this).
4. **Test and Verify on v17:** Do a full regression test on the Angular 17 version of the app:

   * Run `ng build` (both dev and production builds) to ensure the build succeeds without errors.
   * Run your unit tests (`ng test`) and any end-to-end tests. All tests should pass as before.
   * Manually test the application in a staging environment. Pay close attention to any UI component that was affected by the Material upgrade. Since legacy components are gone, confirm that all dialogs, forms, tables, etc., look correct and behave properly with the MDC versions. You might notice minor UI differences (spacing, typography changes) – address these with CSS tweaks or updated Material theme settings as needed.
   * Monitor the console for any warnings. By Angular 17, a lot of deprecations from earlier versions (e.g. old forms API, old HTTP APIs, etc.) might have been removed. If you missed something, Angular will throw an error or warning. Fix those immediately.

## Testing and Validation Before Production

Upgrading across multiple major versions is a significant change. Here are recommended practices to ensure the upgrade is successful before you release the app:

* **Test at Each Stage:** Don’t wait until the end to test. After each major version upgrade (14, 15, 16, 17), run your application and execute all tests. This incremental testing will help you pinpoint which upgrade introduced a problem. For instance, if something worked in Angular 15 but breaks in Angular 16, you know to focus your debugging there. This stepwise approach is advocated by Angular update guides and prevents version leap issues.
* **Unit and Integration Tests:** Run `ng test` to execute your unit tests. Ensure all tests pass. Fix any failing tests ASAP – they often indicate something in the upgrade that changed expected behavior. Also run any integration or UI tests you have (for example, Protractor or Cypress tests) to catch regressions in actual user flows.
* **Manual Exploratory Testing:** Deploy the upgraded app to a staging environment that mirrors production. Perform an end-to-end manual test: click through the application as a user would. Focus on critical workflows and also specifically on components that were likely affected by upgrades (for example, Angular Material components, routing navigation, forms with custom validation, etc.). Verify that the UI looks correct and no functionality is broken. Remember that Angular Material’s visual changes (from legacy to MDC) might require UX approval, so get feedback if needed.
* **Performance and Bundle Checks:** After the final Angular 17 build, analyze your bundle size and performance. Major upgrades can sometimes unexpectedly increase bundle size (though Angular 17 actually tends to reduce it with build optimizations). Use tools like source-map-explorer to ensure no large polyfills or duplicates have crept in. Also test performance-critical paths in the app; Angular 17’s improvements (like deferrable views and faster hydration) should help, but verify that there are no regressions in load time or runtime performance.
* **Consult Official Update Guide:** The Angular team provides an official update guide tool. It can generate a list of specific changes and recommended actions between any two versions. Even after completing the steps above, it’s wise to visit [update.angular.io](https://update.angular.io/) and check if there are any version-specific instructions for v13 -> v14, v14 -> v15, etc., that apply to your project (for example, changes in the compiler options or known deprecated APIs). This can highlight any small changes we might have missed.
* **Stabilize and Monitor:** Once all tests pass in staging, consider running a soak test (leave the application running and have QA use it extensively) to catch any sporadic errors. Monitor the browser console and server logs for any warnings or errors that appear under real usage. It’s easier to fix them in staging than post-release.
* **Gradual Release:** Since this upgrade is significant, you might plan a gradual rollout. For example, deploy the new version to a subset of users or an internal beta environment first. Monitor error tracking tools (like Sentry) for new issues. This can give confidence that the Angular 17 version is production-ready.
* **Backup Plan:** Keep a backup of the last known good build (Angular 13 version) until you’re confident in the new release. In case an unexpected critical issue arises in production, you could revert to the old build as a last resort while you address the problem. With proper testing, this shouldn’t be necessary, but it’s a good risk mitigation practice.

By following this guide – upgrading through each major version step-by-step, addressing breaking changes proactively, and thoroughly testing at each phase – you can upgrade your Angular 13 application to Angular 17 with minimal disruption. In the end, you’ll benefit from the many improvements (performance, new features, and long-term support) that come with the latest Angular version. Good luck, and happy upgrading!

**Sources:**

1. Official Angular Update Guide (Angular 13→17)
2. Angular v16 Release Notes – Breaking Changes
3. Stack Overflow – Angular Material v15 Legacy Migration Discussion
4. Angular Material 15 Upgrade Tips (Dev.to)
5. Stack Overflow – Legacy Material Components Removal in v17
6. Angular 17 Features and Improvements (S. Seta, Medium)
