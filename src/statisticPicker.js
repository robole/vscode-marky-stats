/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");
const activeDoc = require("./activeDocument");

const panels = {
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

class StatisticPicker {
  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      10
    );
    this.statusBarItem.command = "marky-stats.selectItem";
    this.selectedItems = this.readSettings();
    this.quickPickItems = [];
    this.show();
  }

  /**
   * Update the statistic based on the latest text of the active document.
   */
  update() {
    this.quickPickItems[0] = {
      name: panels.READING_TIME,
      label: `Reading Time: ${activeDoc.getReadingTime()} mins`,
    };
    this.quickPickItems[1] = {
      name: panels.WORDS,
      label: `Words: ${activeDoc.getWordCount()}`,
    };
    this.quickPickItems[2] = {
      name: panels.LINES,
      label: `Lines: ${activeDoc.getLineCount()}`,
    };
    this.quickPickItems[3] = {
      name: panels.CHARACTERS,
      label: `Characters: ${activeDoc.getCharacterCount()}`,
    };

    var filteredItems = this.quickPickItems.filter(
      (x) => this.selectedItems.indexOf(x.name) >= 0
    );

    filteredItems.forEach(function (item, index) {
      item.picked = true;
    });

    var label = filteredItems.map((x) => x.label).join(" | ");
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
        statBarItem.selectedItems = fufilled.map((x) => x.name);
        statBarItem.saveSettings().then(function () {
          statBarItem.update();
        });
      }
    });
  }

  /**
   * Save the current selection to the workspace configuration.
   *
   */
  async saveSettings() {
    if (vscode.workspace.name !== undefined) {
      const marky = vscode.workspace.getConfiguration(configPrefix);
      await marky.update(
        configShowReadingTime,
        this.selectedItems.indexOf(panels.READING_TIME) >= 0
      );
      await marky.update(
        configShowWords,
        this.selectedItems.indexOf(panels.WORDS) >= 0
      );
      await marky.update(
        configShowLines,
        this.selectedItems.indexOf(panels.LINES) >= 0
      );
      await marky.update(
        configShowCharacters,
        this.selectedItems.indexOf(panels.CHARACTERS) >= 0
      );
    }
  }

  /**
   * Get the item name from the value of the "statisticStatusBarItem" option in the configuration.
   *
   */
  readSettings() {
    const config = vscode.workspace.getConfiguration(configPrefix);
    var result = [];

    if (config.get(configShowReadingTime)) {
      result.push(panels.READING_TIME);
    }

    if (config.get(configShowWords)) {
      result.push(panels.WORDS);
    }

    if (config.get(configShowLines)) {
      result.push(panels.LINES);
    }

    if (config.get(configShowCharacters)) {
      result.push(panels.CHARACTERS);
    }

    if (result.length > 0) {
      return result;
    }

    return [panels.READING_TIME, panels.WORDS, panels.LINES, panels.CHARACTERS];
  }
}

module.exports = StatisticPicker;
