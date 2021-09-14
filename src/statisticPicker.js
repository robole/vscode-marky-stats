/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");
const activeDoc = require("./activeDocument");
const config = require("./configuration");

const labels = {
  READING_TIME: "Reading Time",
  WORDS: "Words",
  LINES: "Lines",
  CHARACTERS: "Characters",
};

class StatisticPicker {
  constructor() {
    this.quickPickItems = [];
    this.selectedItems = [];
    this.selectionChangeEvent = false;

    this.loadSettings();

    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      10000
    );
    this.statusBarItem.command = "marky-stats.selectItem";

    this.show();
  }

  /**
   * Update the statistic based on the latest text of the active document.
   */
  update() {
    this.quickPickItems[0] = {
      name: labels.READING_TIME,
      label: `${labels.READING_TIME}: ${activeDoc.getReadingTime()} mins`,
    };
    this.quickPickItems[1] = {
      name: labels.WORDS,
      label: `${labels.WORDS}: ${activeDoc.getWordCount()}`,
    };
    this.quickPickItems[2] = {
      name: labels.LINES,
      label: `${labels.LINES}: ${activeDoc.getLineCount()}`,
    };
    this.quickPickItems[3] = {
      name: labels.CHARACTERS,
      label: `${labels.CHARACTERS}: ${activeDoc.getCharacterCount()}`,
    };

    let filteredItems = this.quickPickItems.filter(
      (x) => this.selectedItems.indexOf(x.name) >= 0
    );

    filteredItems.forEach(function (item, index) {
      item.picked = true;
    });

    // if no selection is made, this is an empty string
    let label = filteredItems.map((x) => x.label).join(this.itemSeparator);

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
  async selectItem() {
    let quickPick = vscode.window.showQuickPick(this.quickPickItems, {
      canPickMany: true,
      placeHolder: "Select a statistic to display",
    });

    const statPicker = this;
    quickPick.then(async function (fufilled) {
      if (fufilled) {
        var newSelections = fufilled.map((x) => x.name);
        statPicker.selectedItems = newSelections;

        statPicker.selectionChangeEvent = true;
        await statPicker.saveSettings();
        statPicker.update();
        statPicker.selectionChangeEvent = false;
      }
    });
  }

  /**
   * Save the current settings to the workspace configuration.
   *
   */
  async saveSettings() {
    await config.updateShowReadingTime(
      this.selectedItems.indexOf(labels.READING_TIME) >= 0
    );

    await config.updateShowWords(this.selectedItems.indexOf(labels.WORDS) >= 0);

    await config.updateShowLines(this.selectedItems.indexOf(labels.LINES) >= 0);

    await config.updateShowCharacters(
      this.selectedItems.indexOf(labels.CHARACTERS) >= 0
    );

    await config.updateItemSeparator(this.itemSeparator);
  }

  /**
   * Get the settings from the workspace configuration.
   *
   */
  loadSettings() {
    let selectedItems = [];

    if (config.getShowReadingTime() === true) {
      selectedItems.push(labels.READING_TIME);
    }

    if (config.getShowWords() === true) {
      selectedItems.push(labels.WORDS);
    }

    if (config.getShowLines() === true) {
      selectedItems.push(labels.LINES);
    }

    if (config.getShowCharacters() === true) {
      selectedItems.push(labels.CHARACTERS);
    }

    this.selectedItems = selectedItems;

    this.itemSeparator = config.getItemSeparator();
  }

  /**
   * Set selected statistic items. Only used for testing in this context.
   * @param {[]} items - Statistic items that correspond to the labels e.g. "Reading Time".
   */
  setSelectedItems(items) {
    this.selectedItems = items;
  }

  /**
   * Set the text that separates each statistic item. Only used for testing in this context.
   * @param {string} newValue - The text that separates each statistic item.
   */
  async setItemSeparator(newValue) {
    this.itemSeparator = newValue;
  }

  /**
   * Has the user clicked on the status bar item to change the statistics selected.
   *
   */
  isSelectionChangeEvent() {
    return this.selectionChangeEvent;
  }
}

module.exports = StatisticPicker;
