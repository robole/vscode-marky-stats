/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-require */
// @ts-nocheck
const assert = require("assert");
const vscode = require("vscode");

suite("Statistic Display", () => {
  const extensionID = "robole.marky-stats";
  let extension;

  suiteSetup(() => {
    extension = vscode.extensions.getExtension(extensionID);
  });

  test("Should exist when a markdown file is open", async () => {
    const s = extension.exports.getStatisticPicker();
    assert.ok(s !== undefined);
  });

  test("Should display a statistic on the status bar by default", async () => {
    var s = extension.exports.getStatisticPicker();
    s.setSelectedItems(["Reading Time"]);
    s.update();
    assert.strictEqual(s.getText(), "Reading Time: 1 mins");
  });

  test("Should display the text 'No stat selected' on the status bar if no stat is selected", async () => {
    var s = extension.exports.getStatisticPicker();
    s.setSelectedItems([]);
    s.update();
    assert.strictEqual(s.getText(), "No stat selected");
  });

  test("Should display multiple statistics on the status bar when selected", async () => {
    var s = extension.exports.getStatisticPicker();
    s.setSelectedItems(["Reading Time", "Words"]);
    s.update();
    assert.strictEqual(s.getText(), "Reading Time: 1 mins  Words: 31");
  });

  test("Should be able to change the separator between each statistic to change the format of the text on the status bar", async () => {
    var s = extension.exports.getStatisticPicker();
    s.setSelectedItems(["Reading Time", "Words"]);
    await s.setItemSeparator(",");
    s.update();
    let text = s.getText();

    await s.setItemSeparator("  "); //reset setting

    assert.strictEqual(text, "Reading Time: 1 mins,Words: 31");
  });
});
