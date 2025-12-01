> **STATUS: IN-PROGRESS**
>
> - **Current Version:** Angular 18
> - **Next Steps:** Proceed with "Step 4: Upgrade to Angular 19".
>
> This plan is actively being followed. Steps 1, 2, and 3 are complete.

Thanks for confirming. I’ll now analyze what’s required to update your Angular 15 project—using only non-legacy Angular Material components and no advanced features or third-party build tools—to Angular 20.

I’ll focus on identifying breaking changes, key CLI and dependency updates, and version-specific upgrade requirements from Angular 15 through 20. I’ll get back to you shortly with a detailed step-by-step migration plan.


# Migrating an Angular 15 Project to Angular 20

Upgrading an Angular 15 application to Angular 20 requires a step-by-step approach through each major version (16, 17, 18, 19, then 20). At each stage, we'll address breaking changes, update commands, Angular Material changes, and validation steps. Before starting, ensure your project is under version control and all tests pass on Angular 15. You should upgrade sequentially and verify the app at each step.

## Step 1: Upgrade to Angular 16

### Breaking Changes in Angular 16

* **Node.js and TypeScript Requirements:** Angular 16 supports Node.js 16.14+ or 18.10+, and requires TypeScript >=4.9.3 (up to <5.1). Update your development environment if needed (Node 14 is no longer supported).
* **Standalone Components by Default:** Angular 16 introduced schematics that generate standalone components by default (no NgModule). This isn’t a runtime breaking change, but new components generated via CLI will be standalone unless you opt out. Your existing NgModule-based code will continue to work.
* **Deprecations:** No major Angular APIs were removed in v16, but it continued the deprecation of older module-based patterns in favor of standalone APIs. For example, the Protractor e2e tool was removed in Angular 15; ensure you use modern testing tools. Angular 16 also paved the way for optional Zone.js (still default in v16).
* **Angular Material:** Angular Material v16 includes the MDC-based components and deprecates legacy (non-MDC) components. A warning was issued that **legacy Material components will be removed in v17**. Since your project already uses MDC components, you’re prepared – just avoid using any `MatLegacy*` imports. No breaking CSS changes occurred in v16, but it’s a good time to update any Angular Material theming to the latest practices (Material v16 still uses the old theming API, with optional preview of Material Design 3).

### Update Commands for Angular 16

Run the official Angular update schematics to move to v16:

```bash
# Upgrade Angular frameworks and CLI to v16
ng update @angular/core@16 @angular/cli@16

# If using Angular Material/CDK, upgrade them as well
ng update @angular/material@16 @angular/cdk@16
```

This will update your `package.json` and run any v16 migrations. Ensure the CLI, framework, and Material versions are all aligned to 16.x.

### Post-update Validation (Angular 16)

* **Build and Serve:** After updating, run `ng serve` or `ng build` to verify the app compiles without errors. Fix any TypeScript issues that arise (often due to stricter types in TS 4.9+).
* **Run Tests:** Execute `ng test`. Angular 16 should not introduce breaking changes in tests, but update any deprecated testing APIs. For example, if you still use the old `async()` from `@angular/core/testing`, switch to `waitForAsync()`.
* **Material Components:** Visually inspect a few Material UI pieces. There should be no appearance changes yet. If you see any console warnings about legacy components, remove or replace those usages.
* **Commit Changes:** Once the app runs and tests pass on Angular 16, commit the changes before proceeding.

## Step 2: Upgrade to Angular 17

### Breaking Changes in Angular 17

* **Node.js and TypeScript:** Angular 17 requires Node.js 18.13+ or 20.9+, and TypeScript \~5.2 (>=5.2 <5.3). Ensure your environment meets these requirements. (Node 16 is no longer officially supported as of v17.)
* **Framework Changes:** Angular 17 introduced built-in control flow syntax (`@if`, `@for`, etc.) and deferrable views, but these are additive features. The legacy structural directives (`*ngIf`, `*ngFor`, etc.) are still supported, so existing templates continue to work. There are no removals of those APIs in v17 – they’re just now optional. You may ignore the new syntax for now or gradually adopt it.
* **Angular Material:** **Legacy Angular Material components are removed in v17**. This means any component imported from `@angular/material` without the MDC foundation (the ones marked as “legacy” in v15/16) will no longer exist. Since you already migrated to MDC components, you should not encounter component missing errors. However, double-check that you aren’t using any old prefixes or APIs from Material v15. Material 17 primarily focused on removal of legacy components and internal prep for Material Design 3 support, with no major theming changes yet.
* **Deprecations:** Angular 17 continued to deprecate obsolete APIs. For example, the old `DebugElement.properties` for outputs was removed (use `outputs`), and the View Engine compiler is fully gone (which only affects very old libraries). Ensure all your libraries are Ivy-compatible (likely true if they worked in v15). No common public API that is widely used was outright removed in 17 aside from the Material changes.

### Update Commands for Angular 17

```bash
ng update @angular/core@17 @angular/cli@17
ng update @angular/material@17 @angular/cdk@17
```

Angular CLI v17 may prompt to adjust configuration or tsconfig. Accept recommended changes (for example, enabling new flag in `tsconfig.json` if prompted). The Material update will remove any remaining deprecated component imports. It’s wise to also update Angular CDK alongside Material for consistency.

### Post-update Validation (Angular 17)

* **Compile and Lint:** Run a fresh build. If you were accidentally still using a legacy Material component, the build will error (component not found). If so, replace it with its MDC equivalent (`MatLegacyButton` -> `MatButton`, etc.). Given your project’s use of MDC already, this should not happen.
* **Unit Tests:** Run `ng test` again. Tests should mostly pass as before. If you used any internal APIs that changed (unlikely), update those tests. For example, if you used ComponentFixture’s debug element in unusual ways, adjust to the new patterns.
* **Smoke Test the App:** Click through critical paths in your application in a browser. Angular 17 changes (like deferrable views) are opt-in, so behavior should be unchanged. Ensure Material components still render and behave normally.
* **Note on Optional Features:** You might see console info about new control flow or prompts to try `ng g @angular/core:control-flow` to migrate templates. This is optional; you can gradually adopt the new syntax in future refactors. For now, verify everything works as it did.
* **Commit Changes:** When all looks good on Angular 17, commit the updates.

## Step 3: Upgrade to Angular 18

### Breaking Changes in Angular 18

* **Node.js and TypeScript:** Angular 18 supports Node.js 18.19+, 20.11+, or 22.0+, and requires TypeScript \~5.4 (>=5.4 <5.5). Update Node if needed (Node 16 is unsupported; Node 18+ recommended). Ensure your TS is updated (the Angular CLI update will typically bump the TypeScript devDependency).
* **HttpClientModule Deprecation:** A major change in v18 is that `HttpClientModule` is **deprecated**. Angular introduced the `provideHttpClient()` function for standalone APIs, and now the module is redundant. **Migration:** Remove `HttpClientModule` imports from your `AppModule` (or any module). Instead, add the `provideHttpClient()` call in your module’s `providers` array. For example:

  ```ts
  @NgModule({
    imports: [BrowserModule /*, (remove HttpClientModule) */],
    providers: [provideHttpClient(/* optional: withInterceptorsFromDi() */)],
    bootstrap: [AppComponent]
  })
  export class AppModule {}
  ```

  If your app was bootstrapped with `bootstrapApplication` (standalone), include `provideHttpClient()` in the `providers` of `bootstrapApplication`. This change ensures you don’t declare HttpClientModule twice. After this, HttpClient will still work as before, but you won’t get deprecation warnings. (If you forget to do this and remove HttpClientModule, you’d get a runtime `No provider for HttpClient` error – so double-check that `provideHttpClient` is added.)
* **Angular Material (Material Design 3):** Angular Material 18 stabilizes Material Design 3 (MD3) support and design tokens. This is a **significant theming change**. The Angular Material update schematic will attempt to migrate your Sass styles to the new system. Key points:

  * The **theming API has changed** to use CSS Custom Properties (CSS variables) via design tokens. For example, you’ll see a new `@use`-based Sass API and a unified `mat.theme(...)` mixin for applying theme styles. Many old mixins (e.g. `mat.button-theme`, `mat.dark-theme`) are replaced or consolidated.
  * If you maintained a custom theme SCSS file (e.g. defining `$primary`, `$accent` palettes and calling `angular-material-theme` mixins), you may need to adjust it. The v18 update will introduce new variables like `use-system-variables: true` and generate CSS variables for colors. It may also update your typography definitions. For example, you might see code moving from:

    ```scss
    @include mat.all-component-themes($my-theme);
    ```

    to new usage like:

    ```scss
    @include mat.theme($my-theme);
    ```

    The specifics depend on whether you opt into Material 3. **After updating, review the official Angular Material theming guide for v19** (as v18’s changes are fully realized in v19).
  * **No Legacy Components:** By v18, you should already be on MDC components. Angular Material v18 no longer supports the old non-MDC components at all (they were removed in v17).
* **Optional Builder Migration:** Angular CLI 18 introduces a new lightweight builder package `@angular/build` (using Vite and esbuild). If you are **not using Webpack-specific features** (for example, if you aren’t using Karma or custom webpack config), the update may suggest migrating your `angular.json` to the new builder. This can speed up builds, but it’s optional. The old `@angular-devkit/build-angular` is still compatible (it aliases to the new builder). If you **do use Karma** for tests or any webpack plugins, you might hold off on this migration for now. You can answer “No” to the prompt or skip the schematic; your project will continue using the legacy builder (which still works in v18).
* **Zone.js and Change Detection:** Angular 18 introduced *experimental* zoneless change detection and enabled **event coalescing** by default for new projects. This doesn’t break existing apps – zone.js remains required unless you opt out. Your app will behave the same, but you have the option to opt into zoneless mode and coalescing for performance. No action is needed unless you want to experiment with these features (which would involve adding `provideExperimentalZonelessChangeDetection()` and removing zone.js from polyfills). This is purely optional and backward-compatible.

### Update Commands for Angular 18

```bash
ng update @angular/core@18 @angular/cli@18

ng update @angular/material@18 @angular/cdk@18
```

The core/cli update will likely prompt about the builder migration (choose based on your needs as discussed). The Material update will perform theming-related migrations. Read the console output carefully; it may outline changes made to your SCSS. After these commands, ensure all Angular packages (core, cli, cdk, material) are 18.x.

### Post-update Validation (Angular 18)

* **Project Build:** Do a full build (`ng build`). Pay special attention to any errors or warnings:

  * If you see **`HttpClientModule is deprecated` warnings** or TypeScript errors about `HttpClientModule`, ensure you removed its import and added `provideHttpClient` as described. The app should compile without any HttpClient deprecation warnings once properly migrated.
  * If you get Sass compile errors from your styles, address them. The Material schematic tries to update your theme, but if you had custom Sass, you might need to manually adjust. For example, if you see an error about `mat.get-theme-color` or missing `$theme` variable, it means the old APIs changed. Use the new token APIs or wrap legacy calls in the new functions. (Angular Material’s documentation and migration guide for v18/v19 provide mapping of old to new theming APIs.)
* **Unit Tests:** Run `ng test`. If you removed `HttpClientModule`, your tests using `HttpClientTestingModule` might still pass (it provides its own HttpClient). However, **note**: Angular 18 did **not** yet deprecate `HttpClientTestingModule` (that comes in v20), but you can proactively refactor tests. The new way is to use `provideHttpClientTesting()` in tests instead of importing the module. This is optional in v18, but doing it now will smooth the v20 upgrade. For example:

  ```ts
  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      MyService
    ]
  });
  ```

  This replaces `imports: [HttpClientTestingModule]` in your tests. Ensure all tests still pass after any refactor.
* **Functional Testing:** Serve the app and click through it in a browser. Focus on areas using HTTP calls (they should function as before). Also check **Angular Material** UI: because of theming changes, colors or typography might differ if the migration toggled Material 3. If you opted into Material 3 design tokens (the default in v18+), your app’s colors might shift to the Material 3 palette. Verify the contrast and theming are acceptable.
* **Theming Adjustments:** If the look is off or certain custom styles no longer apply, you may need to update your CSS/SCSS. For instance, with design tokens, some CSS custom properties (like `--mdc-theme-primary`) might replace old Sass variables. You can customize the theme by overriding CSS variables or using the new Sass mixins. The Angular Material guide on theming (for v19) is a great resource. As a quick fix, ensure your global styles include the output of the new `mat.theme(...)` mixin so that all components are styled. The update schematic usually adds this for you in `styles.scss`.
* **Commit Changes:** Once Angular 18 is running well (all tests passing and no major regressions), commit the changes. This is a big step; take time to stabilize here before moving on.

## Step 4: Upgrade to Angular 19

### Breaking Changes in Angular 19

* **Node.js and TypeScript:** Angular 19 requires Node.js 18.19+, 20.11+, or 22.x, and TypeScript \~5.5 (>=5.5 <5.7). Node 18 was still LTS during v19, so it’s supported (Node 20+ recommended). Make sure you’re on at least Node 18.19 or later. Update to the latest npm as well.
* **Standalone Components Default:** In Angular 19, **standalone components are the default** for new projects and the recommended approach. This isn’t a breaking change for existing code – your NgModules still work. However, CLI generators (`ng generate component`) will produce standalone components by default. Be aware of this if you generate new components after upgrading (you can add `--standalone=false` if you want a module-based component). It’s a good time to consider migrating feature modules to standalone components, but it’s not required.
* **Dependency Injection and Signals:** Angular 19 includes DI enhancements and signal improvements (like the Resource API for async data). These are new features and should not break existing code. For example, Angular 19 introduced `destroyRef` and `effect` improvements, but if you aren’t using signals yet, you won’t be affected.
* **Angular Material Theming Overhaul:** **This is the crucial part of Angular 19 for Material users.** Material v19 finalizes the shift to the new theming API using design tokens. Many Sass APIs that were present for Material Design 2 are removed or replaced. Breaking changes in theming include:

  * Removal of the old `mat-` theming mixins for individual components. For example, in earlier versions you might have:

    ```scss
    @include mat.button-theme($theme);
    @include mat.form-field-theme($theme);
    ```

    These are replaced by the global `mat.theme($theme)` mixin that applies all theme styles in one go. The update schematic should remove or comment out the per-component theme mixins in your styles.
  * The `$theme` Sass object (previously created via `mat.define-theme`) is no longer manipulated directly in the same way. In v19+, you don’t pass the `$theme` into each component’s theme mixin; instead, you call `mat.theme($theme)` once. The new API expects that your `$theme` includes color, typography, and density config.
  * CSS Variables (System tokens): Material 19 uses CSS custom properties for theming. If you had custom styles using Sass functions like `mat.get-color-config($theme)` or `mat.get-theme-color(...)`, these will no longer work as before. Instead, you might need to use CSS variable references or the new `mat.color` mixin functions. For example, you can use CSS var `--mat-primary` to get your primary color in runtime styles, or use the new Sass token APIs for compile-time styling.
  * **Migration Tip:** After updating to v19, open your `styles.scss` (or wherever you define your theme). You will likely see changes. For instance, the update might have added:

    ```scss
    @include mat.core();
    :root {
      @include mat.theme($my-app-theme);
    }
    ```

    and removed older includes. If something is missing (like dark theme support or typography), consult the Angular Material theming guide for v19+. You may need to explicitly include a dark theme using the new API (e.g., define a separate \$dark-theme and apply it with `@include mat.theme($dark-theme, $selector: '.dark-theme')`). Ensure that your app’s light and dark themes (if any) are configured properly with the new mixins.
* **Other Angular Changes:** Angular 19 continued to deprecate older APIs in preparation for Angular 20. For example, the old `HttpClientTestingModule` is marked for deprecation (if not already) – we will address that in v20. Also, Angular 19 introduced the **Resource and `rxResource` APIs** to handle async data as signals. This doesn’t break anything; it’s a new feature you can ignore or adopt gradually.
* **Builder and Testing:** If you didn’t adopt the new `@angular/build` in v18, you can still do so in v19. The old builder package is likely still working via alias, but expect it to be removed in the near future. Angular 19’s CLI might print a notice about it. Also, Karma (if you still use it for unit tests) is still supported, but consider migrating to Jest or Web Test Runner in the long term as the ecosystem shifts toward vite-powered tooling.

### Update Commands for Angular 19

```bash
ng update @angular/core@19 @angular/cli@19
ng update @angular/material@19 @angular/cdk@19
```

This will update Angular frameworks to v19. The Material update will perform a crucial migration for your SCSS. **Review the console output and any modified files**, especially your global styles, theme definition, and `angular.json` configuration.

### Post-update Validation (Angular 19)

* **Build Application:** Run `ng build` or `ng serve` and address any errors:

  * **Sass/CSS Errors:** Given the extensive theming changes, this is where you may encounter issues. For example, if you had custom `::ng-deep` styles targeting Material internals, some CSS class names might have changed with Material 3. Adjust those as needed (or better, use the new CSS vars or component `styling` APIs introduced on material.angular.dev for v19).
  * If the Sass compiler complains about undefined mixins or functions, ensure that you have `@use '@angular/material' as mat` at the top of your SCSS and that you’re calling the correct functions. The update should have added needed imports (often via `@angular/material/schematics` or similar). Missing `@use` statements can cause mixins to be undefined.
  * **Theming Check:** After a successful compile, inspect the browser. The visual differences might be more pronounced now. Material Design 3 has different default styles (e.g., larger elevation shadows, updated colors). Confirm that your primary/accent colors are applied (buttons, toggles, etc., should reflect your theme). If something looks off, it could be that your theme variables weren’t applied correctly. For instance, if all components look gray or the color is wrong, ensure the `mat.theme($theme)` mixin is present and receiving the right `$theme` object. You might need to set `color: (primary: ..., secondary: ..., surface: ...)` in your theme definition explicitly if defaults changed.
* **Run Unit Tests:** Execute `ng test`. If you hadn’t yet migrated away from `HttpClientTestingModule`, you might see deprecation warnings (but tests should still pass). It’s highly recommended by this point to remove `HttpClientTestingModule` usage. Use `provideHttpClientTesting()` in tests instead, to avoid failures in Angular 20. Also, if any tests were inspecting Material component internals (like CSS classes), those may need updates due to MD3 changes. Update any selectors or test expectations that rely on Material’s internal DOM if needed.
* **E2E/Integration Tests:** If you have end-to-end tests (Protractor was removed earlier; perhaps you use Cypress or WebDriverIO), run them. Pay attention to any failures due to changed selectors or text (Material 3 components might have different structure or default aria labels). Update your tests accordingly.
* **Manual Testing:** Manually test critical flows. With Angular 19’s improvements largely under the hood, your app’s functionality should remain the same. Focus on style and UI/UX regressions due to Material theming. Also test any dynamic theming (dark mode toggles, etc.) to ensure the new CSS variable system reflects changes.
* **Deprecation Warnings:** Check the terminal and browser console for any warnings. Angular might log deprecation warnings for APIs that will be removed in v20. Common ones to look for: usage of `provideLocationStrategy` (if any), old forms APIs, etc. Addressing them now (if any) will make the final upgrade smoother.
* **Commit Changes:** Once the app is stable on Angular 19, commit the changes. You are now ready for the final step.

## Step 5: Upgrade to Angular 20

### Breaking Changes in Angular 20

* **Node.js Requirement (Major):** Angular 20 drops support for Node 18 (which reached end-of-life in April 2025). **Node.js 20.11.1 or later is required**. Before upgrading, install Node 20 (or newer LTS) on your machine. Using an unsupported Node version will cause the Angular CLI to refuse running.
* **TypeScript:** Angular 20 requires TypeScript 5.8 or above. The update will likely bump your TS to \~5.8.x. If you have custom TS config, ensure compatibility with TS5.8 features. One new compiler option in strict mode is `typeCheckHostBindings` (Angular 20 introduces this flag to tighten template binding checks), but it’s off by default. You can opt in to catch more errors, but it’s not mandatory.
* **Removal of Deprecated APIs:** Angular 20 is a “stabilization” release – many features introduced since v16 are now stable. It also means deprecated APIs from earlier versions are likely removed. For example:

  * **HttpClientModule:** If you somehow still have `HttpClientModule` in use (despite v18’s deprecation), Angular 20 may remove it or at least break it. By now, you should have migrated to `provideHttpClient`. Verify once more that no `HttpClientModule` import remains.
  * **HttpClientTestingModule:** This testing module is officially deprecated in v20. In Angular 20, using it will trigger TypeScript errors or warnings. **Removal/Migration:** All tests should use `provideHttpClientTesting()` instead. If you haven’t done this yet, do it now: import `provideHttpClientTesting` from `@angular/common/http/testing` and add it to your test providers. Remove `HttpClientTestingModule` imports. This migration will fix any failing HTTP tests in Angular 20.
  * **Angular Forms (NgModules):** While Template-driven and Reactive Forms still use `FormsModule`/`ReactiveFormsModule`, Angular 20 has an *experimental* signal-based Forms API (not yet stable). The traditional FormsModule is still supported in v20, but keep an eye on future changes. No action needed now, just be aware of upcoming forms refactor in later versions.
  * **Deprecated Common APIs:** Any functions in `@angular/common` marked deprecated in v18/v19 could be removed. For instance, `getLocaleDateFormat` and related i18n functions were deprecated in v18. If you used those, switch to the native Intl API or `formatDate` from Angular.
  * **Platform Browser:** If your code used the deprecated `DomSanitizer.bypassSecurityTrust...` methods or old APIs for Title/Meta services, ensure you use the latest APIs (these old ones might still exist in v20, but it’s good practice to use the current ones).
* **Angular Material:** Angular Material 20 builds on the v19 changes. There aren’t major new breaking changes reported for v20 Material, as the big shift happened in v19. Material v20 likely continues with the Material 3 design. It’s possible that any remaining backward-compatibility shims for the old theming API are removed in v20. For example, if v19 left any Sass aliases or temporary deprecation warnings, v20 might clean those up. **Action:** Review the console output of `ng update @angular/material@20`. If it performs any additional migrations, apply them. Ensure your theme SCSS has no deprecated calls. By now you should be fully on the design token system. One thing to check: If you have not yet updated typography to use the new CSS vars (instead of the old `mat-typography-config` mixin), Angular 20 might finalize that. Consider using the new `TypographyConfig` API or CSS variables for fonts.
* **Stable APIs:** Many APIs introduced as experimental in earlier versions are now stable in Angular 20. For example, Signals APIs (`effect()`, `toSignal()`, etc.) are fully stable. This doesn’t break anything; it simply means you can rely on them for new development. Also, zoneless change detection, while still preview, is more accessible in v20 (the CLI `ng new` will prompt to enable it). None of these affect existing apps unless you opt in.
* **CLI Changes:** The Angular CLI v20 may introduce new defaults. One noteworthy change: when generating new components, the CLI might shorten file name prefixes or use a new convention (some users noted the CLI generating files like `user.ts` instead of `user.component.ts` for standalone components, as part of an experimental “selectorless components” feature). This is experimental and not a breaking runtime change – just be aware of CLI prompts or unusual file naming schemes for newly generated pieces. You can always override or stick to your preferred conventions.
* **ESM Output and Builder:** Angular 20’s build output is fully optimized for ESM and modern browsers. If you stayed on the old build system, strongly consider migrating to the new one now. The old `@angular-devkit/build-angular` may be completely removed in favor of `@angular/build` in v20 (or soon after). The `ng update` should handle this if you haven’t switched. After updating, check your `angular.json`: under `projects -> architect -> build`, it should use `"builder": "@angular/build:browser"` instead of the old builder. Similarly for `serve` and `test` targets. If not, you might need to manually adjust or run `ng update @angular/cli --migrate-only` for the builder migration.
* **Cleanup:** Angular 20 is a good point to clean up any leftover **migration backups**. Sometimes, update schematics leave TODO comments or backup files (e.g., `theme.scss.bak` or commented out code). Search your project for `TODO` or `DEPRECATED` notes inserted during updates and resolve them. Remove any old code that’s no longer used.

### Update Commands for Angular 20

```bash
ng update @angular/core@20 @angular/cli@20
ng update @angular/material@20 @angular/cdk@20
```

This final update will bring you to Angular 20. The CLI might prompt to enable optional features (like an prompt to turn on zoneless mode or strict host binding checks). You can say yes or no; these are not required and can be enabled later. Focus on getting the project building first. The Material update will ensure you’re on Material 20 – review any output for changes, though it’s likely minimal if you handled v19 correctly.

### Post-update Validation (Angular 20)

* **Node/Environment:** Verify you’re running on Node 20+ (`node -v`). If not, upgrade Node and reinstall your dependencies (`npm install`) to ensure native node modules (if any) are rebuilt for the new Node version.
* **Full Build & Lint:** Run a production build (`ng build --configuration production`). This ensures that TypeScript 5.8 and Angular IVY compilation succeed without errors. If you see TS errors, address them – they could be due to stricter type checks. For example, Angular 20’s stricter binding checks might catch a template type mistake that was previously unnoticed. Fix any such issues (the error messages usually guide you to the problematic binding or query). Run `ng lint` to catch any leftover deprecated usage.
* **Unit Tests:** Run `ng test`. This is where any lingering issues with HttpClient tests will surface if not fixed. If you get errors like “Cannot find module HttpClientTestingModule” or similar, ensure you removed those imports. Tests that failed due to changed behavior should be updated. All tests should be green now.
* **E2E Tests & Manual Testing:** Do a thorough test of the application in a browser. By Angular 20, your app should function as it did in Angular 15, with improvements under the hood. Check forms, routing, HTTP calls, and particularly **Material components**:

  * Look at UI elements like buttons, menus, dialogs to confirm styling is correct. Angular 20 with Material 3 might introduce subtle changes (e.g., denser layouts or updated iconography). Ensure these are acceptable.
  * If any component looks off (for example, a theme color missing), it could indicate a missing CSS variable or an outdated customization. Use the browser dev tools to inspect CSS variables on an element (Material components now expose `--mdc-*` or `--mat-*` variables for colors, etc.). You can adjust your global styles to override these if needed (for instance, to fine-tune a background or border radius).
  * Test interactive components (e.g., date pickers, drop-downs) to ensure no console errors and correct behavior.
* **Performance and Bundle Check:** Angular 20 has optimizations like tree-shaking improvements and optional zone removal. Build your app and compare bundle sizes or performance if you like. You might notice smaller bundles thanks to dropping legacy polyfills (especially if you removed zone.js for signals-only apps, but if not, it’s similar).
* **Finalize and Document:** Remove any references to older Angular versions in your documentation. Update README or comments to note that the project now requires Node 20 and Angular 20. It’s also wise to update any CI pipelines to use Node 20.

## Conclusion and Next Steps

You have now incrementally upgraded from Angular 15 to Angular 20. Each phase involved updating dependencies, adjusting code for breaking changes, and testing the application:

* **Breaking Changes Summary:** We addressed all major breaking changes: removed legacy Material components (v17), replaced HttpClientModule with `provideHttpClient` (v18), overhauled theming to Material Design 3 (v18/v19), and dropped deprecated testing modules by v20. We also kept the environment up-to-date (Node, TypeScript) at each step.
* **Testing:** At each upgrade step, we ran unit tests and performed manual verification to catch issues early. This phased approach ensures that when something breaks, you know which version caused it and can fix it in isolation.
* **Angular Material:** Your project uses modern Angular Material components, and now it also uses the modern theming system. All legacy APIs from Angular Material are gone by v19, and you’re well-positioned to use Material’s latest features. If you need to further customize the Material theme, use the new CSS variable theming guide as a reference.
* **Future-Proofing:** Angular 20 sets the stage for future features like signal-based forms and zoneless change detection. While you might not use these yet, your app is now clean of old patterns and ready to adopt new Angular innovations when you choose. Keep an eye on Angular’s deprecation guide for anything that might be phased out in v21+ (for example, FormsModule might get a new alternative in the future).

Finally, run one more full regression test on the Angular 20 application. With everything passing, you can confidently deploy the updated app. Enjoy the performance improvements and new features of Angular 16–20 in your project!
