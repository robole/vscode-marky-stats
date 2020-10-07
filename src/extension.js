// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");
const StatisticDisplay = require("./statistic-display");

module.exports = {
  activate,
  deactivate,
};

let statisticDisplay;

function activate(context) {
  statisticDisplay = new StatisticDisplay();

  context.subscriptions.push(
    vscode.commands.registerCommand("marky-stats.selectItem", () => {
      statisticDisplay.selectItem();
    }),
    vscode.workspace.onDidChangeTextDocument(function (e) {
      if (e.document.languageId === "markdown") {
        statisticDisplay.update();
      }
    }),
    vscode.window.onDidChangeActiveTextEditor(function (e) {
      if (e.document.languageId === "markdown") {
        statisticDisplay.show();
      } else {
        statisticDisplay.hide();
      }
    })
  );

  // this can be called externally through vscode.extensions.getExtension(extensionID).exports. This is useful for testing. See statistic-display.test.js for an example.
  let api = {
    getStatisticDisplay() {
      return statisticDisplay;
    },
  };

  return api;
}

function deactivate() {}
