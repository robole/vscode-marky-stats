/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");
const activeDoc = require("./activeDocument");

const panels = {
  READING_TIME: "Reading Time",
  WORDS: "Words",
  LINES: "Lines",
  CHARACTERS: "Characters",
}

class StatisticPicker {
  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      10
    );
    this.configPrefix = "markyMarkdown";
    this.statusBarItem.command = "marky-stats.selectItem";
    this.selection = this.getSelectionNameFromConfig();
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

    var quickPickItem = this.getQuickPickItemByName(this.selection);
    this.statusBarItem.text = quickPickItem.label;
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
      canPickMany: false,
      placeHolder: "Select a statistic to display",
    });

    const statBarItem = this;
    quickPick.then(function (fufilled) {
      if (fufilled) {
        statBarItem.selection = fufilled.name;
        statBarItem.save().then(function () {
          statBarItem.update();
        });
      }
    });
  }

  /**
   * Save the current selection to the workspace configuration. The key from the text is saved e.g. "Reading Time".
   *
   */
  async save() {
    if (vscode.workspace.name !== undefined) {
      const marky = vscode.workspace.getConfiguration(this.configPrefix);
      await marky.update("statisticStatusBarItem", this.selection);
    }
  }

  /**
   * Get the item name from the value of the "statisticStatusBarItem" option in the configuration.
   *
   */
  getSelectionNameFromConfig() {
    const config = vscode.workspace.getConfiguration(this.configPrefix);
    const value = config.get("statisticStatusBarItem");

    var panelNames = [panels.READING_TIME, panels.WORDS, panels.LINES, panels.CHARACTERS];

    if (panelNames.indexOf(value) >= 0) {
      return value;
    }

    return panels.READING_TIME;
  }

  /**
   * Gets one of quickPickItems by name
   * @param {*} name - name of quickPickItem
   * @returns quickPickItem
   */
  getQuickPickItemByName(name) {
    var item = this.quickPickItems.find(x => x.name === name);

    if (item) {
      return item;
    }

    return this.quickPickItems[0];
  }
}

module.exports = StatisticPicker;
