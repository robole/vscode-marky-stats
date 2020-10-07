/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");
const activeDoc = require("./active-document");

class StatisticDisplay {
  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      10
    );
    this.statusBarItem.command = "marky-stats.selectItem";
    this.selection = 0;
    this.quickPickItems = [];
    this.show();
  }

  /**
   * Update the statistic based on the latest text of the active document.
   */
  update() {
    this.quickPickItems[0] = {
      selection: 0,
      label: `Reading Time: ${activeDoc.getReadingTime()} mins`,
    };
    this.quickPickItems[1] = {
      selection: 1,
      label: `Words: ${activeDoc.getWordCount()}`,
    };
    this.quickPickItems[2] = {
      selection: 2,
      label: `Lines: ${activeDoc.getLineCount()}`,
    };
    this.quickPickItems[3] = {
      selection: 3,
      label: `Characters: ${activeDoc.getCharacterCount()}`,
    };

    this.quickPickItems[this.selection].picked = true;
    this.statusBarItem.text = this.quickPickItems[this.selection].label;
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
        statBarItem.selection = fufilled.selection;
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
      // eslint-disable-next-line prefer-destructuring
      let label = this.quickPickItems[this.selection].label;
      let key = label.split(":")[0];
      const marky = vscode.workspace.getConfiguration("markyMarkdown");
      await marky.update("statisticStatusBarItem", key);
    }
  }

  /**
   * Translate the text to an index for selection of the correct quickpick item.
   */
  getSelectionIndex(text) {
    let index = 0;
    if (text.startsWith("Reading")) {
      index = 0;
    } else if (text.startsWith("Word")) {
      index = 1;
    } else if (text.startsWith("Line")) {
      index = 2;
    } else if (text.startsWith("Character")) {
      index = 3;
    }

    return index;
  }
}

module.exports = StatisticDisplay;
