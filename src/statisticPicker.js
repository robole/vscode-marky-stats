/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");
const activeDoc = require("./activeDocument");

const labels = {
  READING_TIME: "Reading Time",
  WORDS: "Words",
  LINES: "Lines",
  CHARACTERS: "Characters",
};

// configuration properties in package.json
const configPrefix = "markyMarkdown";
const configShowReadingTime = "statsStatusBarShowReadingTime";
const configShowWords = "statsStatusBarShowWords";
const configShowLines = "statsStatusBarShowLines";
const configShowCharacters = "statsStatusBarShowCharacters";
const configSeparator = "statsStatusBarLabelsSeparator";

class StatisticPicker {
  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      10
    );
    this.statusBarItem.command = "marky-stats.selectItem";
    this.readSettings();
    this.quickPickItems = [];
    this.show();
  }

  /**
   * Update the statistic based on the latest text of the active document.
   */
  update() {
    this.quickPickItems[0] = {
      name: labels.READING_TIME,
      label: `Reading Time: ${activeDoc.getReadingTime()} mins`,
    };
    this.quickPickItems[1] = {
      name: labels.WORDS,
      label: `Words: ${activeDoc.getWordCount()}`,
    };
    this.quickPickItems[2] = {
      name: labels.LINES,
      label: `Lines: ${activeDoc.getLineCount()}`,
    };
    this.quickPickItems[3] = {
      name: labels.CHARACTERS,
      label: `Characters: ${activeDoc.getCharacterCount()}`,
    };

    var filteredItems = this.quickPickItems.filter(
      (x) => this.selectedItems.indexOf(x.name) >= 0
    );

    filteredItems.forEach(function (item, index) {
      item.picked = true;
    });

    var label = filteredItems.map((x) => x.label).join(this.separator);
    this.statusBarItem.text = label;
  }

  /**
   * Get the text displayed.
   */
  getText() {
    return this.statusBarItem.text;
  }

  /**
   * Show the statistic in the status bar.
   */
  show() {
    this.update();
    this.statusBarItem.show();
  }

  /**
   * Hide the statistic in the status bar.
   */
  hide() {
    this.statusBarItem.hide();
  }

  /**
   * Dispose the object and free resources.
   */
  dispose() {
    this.statusBarItem.dispose();
  }

  /**
   * Show a quick pick selection of the statistics for the active document. The selection will change the display text.
   *
   */
  selectItem() {
    let quickPick = vscode.window.showQuickPick(this.quickPickItems, {
      canPickMany: true,
      placeHolder: "Select a statistic to display",
    });

    const statBarItem = this;
    quickPick.then(function (fufilled) {
      if (fufilled) {
        var newItems = fufilled.map((x) => x.name);
        statBarItem.selectedItems = statBarItem.controlEmptiness(newItems);
        statBarItem.saveSettings().then(function () {
          statBarItem.update();
        });
      }
    });
  }

  /**
   * Save the current settings to the workspace configuration.
   *
   */
  async saveSettings() {
    if (vscode.workspace.name !== undefined) {
      const marky = vscode.workspace.getConfiguration(configPrefix);
      await marky.update(
        configShowReadingTime,
        this.selectedItems.indexOf(labels.READING_TIME) >= 0
      );
      await marky.update(
        configShowWords,
        this.selectedItems.indexOf(labels.WORDS) >= 0
      );
      await marky.update(
        configShowLines,
        this.selectedItems.indexOf(labels.LINES) >= 0
      );
      await marky.update(
        configShowCharacters,
        this.selectedItems.indexOf(labels.CHARACTERS) >= 0
      );
      await marky.update(configSeparator, this.separator);
    }
  }

  /**
   * Get the settings from the workspace configuration.
   *
   */
  readSettings() {
    const config = vscode.workspace.getConfiguration(configPrefix);
    var settItems = [];

    if (config.get(configShowReadingTime)) {
      settItems.push(labels.READING_TIME);
    }

    if (config.get(configShowWords)) {
      settItems.push(labels.WORDS);
    }

    if (config.get(configShowLines)) {
      settItems.push(labels.LINES);
    }

    if (config.get(configShowCharacters)) {
      settItems.push(labels.CHARACTERS);
    }

    this.selectedItems = this.controlEmptiness(settItems);

    var settSeparator = config.get(configSeparator);

    if (settSeparator === undefined) {
      settSeparator = "  ";
    }

    this.separator = settSeparator;
  }

  /**
   * Select items programmatically. For testing purpose.
   * @param {*} items - New items.
   */
  setSelection(items) {
    this.selectedItems = items;
  }

  /**
   * Replace empty list of selected items with default value.
   */
  controlEmptiness(items) {
    if (items.length === 0) {
      items = [labels.READING_TIME];
    }
    return items;
  }
}

module.exports = StatisticPicker;
