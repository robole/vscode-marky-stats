/* eslint-disable no-undef */
// @ts-nocheck
const assert = require("assert");
const vscode = require("vscode");

suite("Extension", () => {
  const extensionID = "robole.marky-stats";
  const extensionShortName = "marky-stats";

  let extension;

  suiteSetup(() => {
    extension = vscode.extensions.getExtension(extensionID);
  });

  test("Extension should activate", async () => {
    // extension is active before test is run as it loads very quickly
    assert.strictEqual(extension.isActive, true);
  });

  test("All package.json commands should be registered in extension", (done) => {
    const packageCommands = extension.packageJSON.contributes.commands.map(
      (c) => c.command
    );

    // get commands for all user extensions excluding vs code commands.
    vscode.commands.getCommands(true).then((allCommands) => {
      const activeCommands = allCommands.filter((c) =>
        c.startsWith(`${extensionShortName}.`)
      );
      activeCommands.forEach((command) => {
        const result = packageCommands.some((c) => c === command);
        assert.strictEqual(result, true);
      });
      done();
    });
  });
});
