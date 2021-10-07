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
};

class StatisticPicker {
  constructor() {
    this.quickPickItems = [];
    this.selectedItems = [];
    this.selectionChangeEvent = false;

    this.loadSettings();

    this.statusBarItem = createStatusBarItem(this.alignment);

    this.show();
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

    this.selectedItems = selectedItems;

    this.itemSeparator = Configuration.getItemSeparator();

    // Values are: "Left" and "Right"
    this.alignment = Configuration.getAlignment();
  }

  /**
   * Update the statistics based on the latest text of the active document.
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

    let filteredQuickPickItems = this.quickPickItems.filter(
      (x) => this.selectedItems.indexOf(x.name) >= 0
    );

    filteredQuickPickItems.forEach((item) => {
      item.picked = true;
    });

    let text = "No stat selected";

    // if items are selected
    if (filteredQuickPickItems.length > 0) {
      text = filteredQuickPickItems
        .map((x) => x.label)
        .join(this.itemSeparator);
    } else {
      vscode.window.showWarningMessage(
        "Did you intend to deselect all statistics? The text 'No stat selected' is now shown in the status bar."
      );
    }

    this.statusBarItem.text = text;
  }

  /**
   * Reload the status bar item to reflect all config changes. The alignment property can only be set when
   * a status bar item is created, therefore we need to create a new status bar item to show the
   * change when the user changes the setting.
   */
  reload() {
    this.loadSettings();

    this.dispose();
    this.statusBarItem = createStatusBarItem(this.alignment);

    this.show();
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
        let newSelections = fufilled.map((x) => x.name);
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
  }

  /**
   * Has the user clicked on the status bar item to change the statistics selected.
   */
  isSelectionChangeEvent() {
    return this.selectionChangeEvent;
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
  setItemSeparator(newValue) {
    this.itemSeparator = newValue;
  }
}

/**
 * Factory method to create a new status bar item
 */
function createStatusBarItem(alignment = "Left") {
  // priority determines how far to the left or right the item
  // is aligned. These arbitary numbers gave me the result I desired,
  // which is to keep the item closest to the center of the bar
  let priority = 0;
  let alignmentEnumValue = vscode.StatusBarAlignment.Left;

  if (alignment === "Right") {
    alignmentEnumValue = vscode.StatusBarAlignment.Right;
    priority = 10000;
  }

  let statusBarItem = vscode.window.createStatusBarItem(
    alignmentEnumValue,
    priority
  );

  statusBarItem.command = "marky-stats.selectItem";

  return statusBarItem;
}

module.exports = StatisticPicker;
