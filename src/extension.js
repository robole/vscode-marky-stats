// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");
const StatisticPicker = require("./statisticPicker");

module.exports = {
  activate,
  deactivate,
};

let statisticPicker;

function activate(context) {
  statisticPicker = new StatisticPicker();

  context.subscriptions.push(
    vscode.commands.registerCommand("marky-stats.selectItem", () => {
      statisticPicker.selectItem();
    }),
    vscode.workspace.onDidChangeTextDocument(function (e) {
      if (e.document && e.document.languageId === "markdown") {
        statisticPicker.update();
      }
    }),
    vscode.window.onDidChangeActiveTextEditor(function (e) {
      if (e.document && e.document.languageId === "markdown") {
        statisticPicker.show();
      } else if (e.document && e.document.languageId !== "markdown") {
        statisticPicker.hide();
      }
    })
  );

  /* This can be called externally through vscode.extensions.getExtension(extensionID).exports.
   This is useful for testing. See statisticPicker.test.js for an example. */
  let api = {
    getStatisticPicker() {
      return statisticPicker;
    },
  };

  return api;
}

function deactivate() {}
