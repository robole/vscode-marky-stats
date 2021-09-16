/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");
const ActiveDocument = require("./activeDocument");
const Configuration = require("./configuration");

const labels = {
  READING_TIME: "Reading Time",
  WORDS: "Words",
  LINES: "Lines",
  CHARACTERS: "Characters",
  AUTHORSSHEETS: "Author's Sheets",
};

class StatisticPicker {
  constructor() {
    this.quickPickItems = [];
    this.selectedItems = [];
    this.selectionChangeEvent = false;

    this.loadSettings();

    // the last paramete is *priority*. It determines how far left or right the position of
    // the item is. This arbitary number gave me the desired result
    this.statusBarItem = vscode.window.createStatusBarItem(
      this.alignment,
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
      label: `${labels.READING_TIME}: ${ActiveDocument.getReadingTime()} mins`,
    };
    this.quickPickItems[1] = {
      name: labels.WORDS,
      label: `${labels.WORDS}: ${ActiveDocument.getWordCount()}`,
    };
    this.quickPickItems[2] = {
      name: labels.LINES,
      label: `${labels.LINES}: ${ActiveDocument.getLineCount()}`,
    };
    this.quickPickItems[3] = {
      name: labels.CHARACTERS,
      label: `${labels.CHARACTERS}: ${ActiveDocument.getCharacterCount()}`,
    };
    this.quickPickItems[4] = {
      name: labels.AUTHORSSHEETS,
      label: `${labels.AUTHORSSHEETS}: ${ActiveDocument.getAuthorsSheets()}`,
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
    await Configuration.updateShowReadingTime(
      this.selectedItems.indexOf(labels.READING_TIME) >= 0
    );

    await Configuration.updateShowWords(
      this.selectedItems.indexOf(labels.WORDS) >= 0
    );

    await Configuration.updateShowLines(
      this.selectedItems.indexOf(labels.LINES) >= 0
    );

    await Configuration.updateShowCharacters(
      this.selectedItems.indexOf(labels.CHARACTERS) >= 0
    );

    await Configuration.updateShowAuthorsSheets(
      this.selectedItems.indexOf(labels.AUTHORSSHEETS) >= 0
    );
  }

  /**
   * Get the settings from the workspace configuration.
   *
   */
  loadSettings() {
    let selectedItems = [];

    if (Configuration.getShowReadingTime() === true) {
      selectedItems.push(labels.READING_TIME);
    }

    if (Configuration.getShowWords() === true) {
      selectedItems.push(labels.WORDS);
    }

    if (Configuration.getShowLines() === true) {
      selectedItems.push(labels.LINES);
    }

    if (Configuration.getShowCharacters() === true) {
      selectedItems.push(labels.CHARACTERS);
    }

    if (Configuration.getShowAuthorsSheets() === true) {
      selectedItems.push(labels.AUTHORSSHEETS);
    }

    this.selectedItems = selectedItems;

    this.itemSeparator = Configuration.getItemSeparator();

    this.charactersPerAuthorsSheet = Configuration.getCharactersPerAuthorsSheet();

    let alignment = Configuration.getAlignment();

    if (alignment === "Left") {
      this.alignment = vscode.StatusBarAlignment.Left;
    } else {
      this.alignment = vscode.StatusBarAlignment.Right;
    }
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
   * Set the number of characters per author's sheet. Only used for testing in this context.
   * @param {string} newValue - The number of characters per author's sheet.
   */
  async setCharactersPerAuthorsSheet(newValue) {
    this.charactersPerAuthorsSheet = newValue;
  }

  /**
   * Has the user clicked on the status bar item to change the statistics selected.
   */
  isSelectionChangeEvent() {
    return this.selectionChangeEvent;
  }
}

module.exports = StatisticPicker;
