# Change Log

All notable changes to the "Marky Stats" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.10.0] - 2023-04-08

### Changed

- Updated description in *package.json* to match subtitle in *README.md*.
- Tidied up *Show appreciation* section of README.

## [0.9.0] - 2023-04-08

### Added

- Added a license.

### Changed

- Remove some unnecessary files making into vsix by updating *.vscodeignore*.

## [0.8.1] - 2023-04-08

### Changed

- The secret token for the GitHub action to publish to VS Code Marketplae was out of date. Incrementing version number to verify autopublishing is correctly implemented.

## [0.8.0] - 2023-04-08

### Changed

- Changed subtitle in README to more clearly articulate purpose of extension.
- Updated webpack and webpack cli to version 5.
- Updated VSCE and included the `sponsors` field in *package.json*.

## [0.7.0] - 2021-10-07

### Changed

- Change the position of the status bar item immediately when the `alignment` setting is changed. Changed `statisticPicker.js` to recreate the status bar item when the `alignment` setting is changed.

### Added

- Added a warning message when no stat is selected.

## [0.6.2] - 2021-10-07

### Fixed

- When no stat is selected, set the text of status bar item to "No stat selected".

## [0.6.1] - 2021-09-15

### Added

- Added funding.yml.

### Changed

- Added enum values for `Stats Aligment` to README.

## [0.6.0] - 2021-09-15

### Added

- Added `Marky Markdown: Stats Alignment`.

### Changed

- Some refactoring of names.

## [0.5.1] - 2021-09-15

### Changed

- Added `Marky Markdown: Stats Words Per Minute` to Settings section in README.
- Centered example.gif in README.

## [0.5.0] - 2021-09-14

### Added

- Added setting `Stat Words Per Minute` to enable the calculation of reading time to be adjusted.
- Added capability to display multiple statistics by adding the following settings:
	1. `Stat Show Reading Time`.
	1. `Stat Show Words`.
	1. `Stat Show Characters`.
	1. `Stat Show Lines`.
- Added event handler for `onDidChangeActiveTextEditor` to *extension.js* to ensure that config changes are reflected immediately.
- Added more tests to *activeDocument.test.js* and *statisticPicker.test.js*.

### Changed

- Replaced the setting `Statistic Status Bar Item` with mutliple settings as listed above.
- Refactored code for handling configuration. Now, quickpick changes user settings, before it was changing workspace settings.

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
