# Change Log

All notable changes to the "Marky Stats" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.4.3] - 2021-08-12

### Changed

- Added checks on `document` to prevent reporting of "document undefined" error. It seems to still occur when the active editor is not a text document, for example when you open an extension's detail page. Therefore, there is no way to prevent this from happening.

## [0.4.2] - 2021-06-20

### Fixed

- Fixed the initial loading of a value from the settings config.

## [0.4.1] - 2021-05-08

### Fixed

- Fix typo in README.

## [0.4.0] - 2021-05-07

### Changed

- Change the format of README and sharpen up the copy.
- Changed command title to `Marky Stats: Change Statistic`.

## Fixed

- Change command `enablement` to "editorLangId == markdown". The `editTextFocus` messes things up.

## [0.3.1] - 2021-01-05

### Fixed

- To get the Github Action working with new token.

## [0.3.0] - 2021-01-05

### Added

- Added Github action to publish to VS Code marketplace and Open VSX marketplace on push.
- Added badges for download and install count.

### Edited

- Description in package.json to indicate that it supports all languages.

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
