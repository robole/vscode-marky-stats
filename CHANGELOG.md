# Change Log

All notable changes to the "Marky Stats" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.2.1] - 2020-12-14

### Fixed

- Word count did not work for non-latin scripts. Updated regex to support all languages.

### Added

- Automatic task for running webpack on startup.
- Tests for russian text.

## [0.2.0] - 2020-10-08

### Added

- Added `Enablement` property to command in package.json.
- Added *extension.test.js* and *statistic-display.test.js*.

### Changed

- Refactored code to be easier to test.
- Added a check to see if a workspace is open before saving setting.

## [0.1.0] - 2020-08-18

### Added

- Initial release.
