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
    this.quickPickItem = [];
    this.show();
  }

  /**
   * Update statistic status bar item for the active document. Item selected is based on workspace configuration.
   */
  update() {
    const marky = vscode.workspace.getConfiguration("markyMarkdown");
    const item = marky.get("statisticStatusBarItem");

    this.selection = this.getWorkspaceSelection(item);

    this.quickPickItem[0] = {
      selection: 0,
      label: `Reading Time: ${activeDoc.getReadingTime()} mins`,
    };
    this.quickPickItem[1] = {
      selection: 1,
      label: `Words: ${activeDoc.getWordCount()}`,
    };
    this.quickPickItem[2] = {
      selection: 2,
      label: `Lines: ${activeDoc.getLineCount()}`,
    };
    this.quickPickItem[3] = {
      selection: 3,
      label: `Characters: ${activeDoc.getCharacterCount()}`,
    };

    this.quickPickItem[this.selection].picked = true;
    this.statusBarItem.text = this.quickPickItem[this.selection].label;
  }

  /**
   * Show statistic status bar item.
   */
  show() {
    this.update();
    this.statusBarItem.show();
  }

  /**
   * Hide statistic status bar item.
   */
  hide() {
    this.statusBarItem.hide();
  }

  /**
   * Dipose statistic status bar item.
   */
  dispose() {
    this.statusBarItem.dispose();
  }

  /**
   * Show a modal dialog with the statistics for the document.
   *
   */
  showSummaryModal() {
    let text = this.quickPickItem.join("\n");
    vscode.window.showInformationMessage(text, {
      modal: true,
    });
  }

  /**
   * Show a quick pick selection for the statistics of the active document. The selection will toggle the label text for the status bar item.
   *
   */
  selectItem() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId !== "markdown") {
      return;
    }

    let quickPick = vscode.window.showQuickPick(this.quickPickItem, {
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
   * Save the current selection to the workspace configuration.
   *
   */
  async save() {
    let settingValue = this.quickPickItem[this.selection].label.split(":")[0];
    return this.write(settingValue);
  }

  /**
   * Write the current selection to the workspace configuration.
   *
   */
  async write(value) {
    const marky = vscode.workspace.getConfiguration("markyMarkdown");
    return marky.update("statisticStatusBarItem", value);
  }

  /**
   * Get the value from workspace configuration and translate to an index.
   */
  getWorkspaceSelection(value) {
    let index = 0;
    if (value.startsWith("Reading")) {
      index = 0;
    } else if (value.startsWith("Word")) {
      index = 1;
    } else if (value.startsWith("Line")) {
      index = 2;
    } else if (value.startsWith("Character")) {
      index = 3;
    }

    return index;
  }
}

module.exports = StatisticDisplay;
