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

  test("Should exist", async () => {
    const s = extension.exports.getStatisticPicker();
    assert.ok(s !== undefined);
  });

  test("Should display a statistic by default", async () => {
    var s = extension.exports.getStatisticPicker();
    s.setSelectedItems(["Reading Time"]);
    s.update();
    assert.strictEqual(s.getText(), "Reading Time: 1 mins");
  });

  test("Should show the string 'No stat selected' if no stat is selected", async () => {
    var s = extension.exports.getStatisticPicker();
    s.setSelectedItems([]);
    s.update();
    assert.strictEqual(s.getText(), "No stat selected");
  });

  test("Should display multiple statistics", async () => {
    var s = extension.exports.getStatisticPicker();
    s.setSelectedItems(["Reading Time", "Words"]);
    s.update();
    assert.strictEqual(s.getText(), "Reading Time: 1 mins  Words: 31");
  });

  test("Should be able to update the separator between statistics", async () => {
    var s = extension.exports.getStatisticPicker();
    s.setSelectedItems(["Reading Time", "Words"]);
    await s.setItemSeparator(",");
    s.update();
    let text = s.getText();

    await s.setItemSeparator("  "); //reset setting

    assert.strictEqual(text, "Reading Time: 1 mins,Words: 31");
  });
});
