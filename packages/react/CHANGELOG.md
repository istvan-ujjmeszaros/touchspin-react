# @touchspin/react

## 5.1.0

### Minor Changes

- ab9e6f1: ### Feat: Complete TouchSpin API support for React

  Added complete TouchSpinHandle interface with all core methods (startUpSpin, startDownSpin, stopSpin, updateSettings) and TouchSpin event support (onMin, onMax, onStartSpin, onStopSpin, etc.) as React props. Enhanced documentation with comprehensive API reference and usage examples. Updated example app to demonstrate all features with event tracking and imperative controls. Full TypeScript support with proper type definitions.

## 5.0.0

### Patch Changes

- 841ab03: Promote the React adapter to its first stable v5.0.0 release, aligned with the TouchSpin 5 renderer ecosystem and ready for npm consumers.
- dbd362e: Update dependencies to stable TouchSpin 5.0.1 release

## 0.0.0-alpha-20251017021912

### Patch Changes

- - Fixed a bug where the component would lose focus on every value change.
  - Updated `@touchspin` dependencies to their latest versions.
  - Improved the example application by fixing the "Log getValue()" button and adding an alert to the "Submit" button.

## 5.0.1-alpha.0

### Patch Changes

- TouchSpin v5.0.0 Alpha Release

  This is the first alpha release of TouchSpin v5, featuring a completely rewritten architecture:

  **New Features:**

  - Modular renderer system (Bootstrap 3/4/5, Tailwind, Vanilla CSS)
  - React adapter with per-renderer subpath exports
  - Standalone, jQuery, and Web Component adapters
  - Full TypeScript support with complete type definitions
  - Comprehensive test coverage (1000+ tests)
  - Modern ESM and UMD builds
  - Enhanced accessibility (ARIA compliance)

  **Breaking Changes:**

  - Complete API redesign from v4.x
  - New package structure with scoped @touchspin/\* packages
  - Renamed main package from `bootstrap-touchspin` to `@touchspin/core`

  **Alpha Notice:**
  This is an alpha release for early testing. API may change before stable release.

- Updated dependencies
  - @touchspin/core@5.0.1-alpha.0
  - @touchspin/renderer-bootstrap3@5.0.1-alpha.0
  - @touchspin/renderer-bootstrap4@5.0.1-alpha.0
  - @touchspin/renderer-bootstrap5@5.0.1-alpha.0
  - @touchspin/renderer-tailwind@5.0.1-alpha.0
  - @touchspin/renderer-vanilla@5.0.1-alpha.0
