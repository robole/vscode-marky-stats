/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-require */
// @ts-nocheck
const assert = require("assert");
const vscode = require("vscode");
const { getStatisticPicker } = require("../../src/extension");

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

  test("Should display a statistic", async () => {
    const s = extension.exports.getStatisticPicker();
    assert.strictEqual(s.getText(), "Reading Time: 1 mins");
  });
});
