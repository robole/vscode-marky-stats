// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");
const StatisticDisplay = require("./statistic-display");

function activate(context) {
  let stat = new StatisticDisplay();

  context.subscriptions.push(
    vscode.commands.registerCommand("marky-stats.selectItem", () => {
      stat.selectItem();
    }),
    vscode.workspace.onDidChangeTextDocument(function (e) {
      if (e.document.languageId === "markdown") {
        stat.update();
      }
    }),
    vscode.window.onDidChangeActiveTextEditor(function (e) {
      if (e.document.languageId === "markdown") {
        stat.show();
      } else {
        stat.hide();
      }
    })
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
