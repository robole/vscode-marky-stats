/* eslint-disable import/no-unresolved, node/no-missing-require */
const assert = require("assert");
const path = require("path");
const vscode = require("vscode");
const ActiveDocument = require("../../src/activeDocument");

suite("ActiveDocument", () => {
  test("getWordCount for english text", (done) => {
    vscode.workspace.openTextDocument(path.join(__dirname, "test-en.md")).then(
      (document) => {
        vscode.window.showTextDocument(document).then(() => {
          // @ts-ignore
          assert.strictEqual(ActiveDocument.getWordCount(), 31);
          done();
        });
      },
      (error) => {
        assert.fail(error);
      }
    );
  });

  test("getWordCount for russian text", (done) => {
    vscode.workspace.openTextDocument(path.join(__dirname, "test-ru.md")).then(
      (document) => {
        vscode.window.showTextDocument(document).then(() => {
          // @ts-ignore
          assert.strictEqual(ActiveDocument.getWordCount(), 25);
          done();
        });
      },
      (error) => {
        assert.fail(error);
      }
    );
  });

  test("getReadingTime", (done) => {
    vscode.workspace.openTextDocument(path.join(__dirname, "test-en.md")).then(
      (document) => {
        vscode.window.showTextDocument(document).then(() => {
          // @ts-ignore
          assert.strictEqual(ActiveDocument.getReadingTime(), 1);
          done();
        });
      },
      (error) => {
        assert.fail(error);
      }
    );
  });

  test("getCharacterCount for english text", (done) => {
    vscode.workspace.openTextDocument(path.join(__dirname, "test-en.md")).then(
      (document) => {
        vscode.window.showTextDocument(document).then(() => {
          // @ts-ignore
          assert.strictEqual(ActiveDocument.getCharacterCount(), 241);
          done();
        });
      },
      (error) => {
        assert.fail(error);
      }
    );
  });

  test("getCharacterCount for russian text", (done) => {
    vscode.workspace.openTextDocument(path.join(__dirname, "test-ru.md")).then(
      (document) => {
        vscode.window.showTextDocument(document).then(() => {
          // @ts-ignore
          assert.strictEqual(ActiveDocument.getCharacterCount(), 167);
          done();
        });
      },
      (error) => {
        assert.fail(error);
      }
    );
  });

  test("getLineCount", (done) => {
    vscode.workspace.openTextDocument(path.join(__dirname, "test-en.md")).then(
      (document) => {
        vscode.window.showTextDocument(document).then(() => {
          // @ts-ignore
          assert.strictEqual(ActiveDocument.getLineCount(), 4);
          done();
        });
      },
      (error) => {
        assert.fail(error);
      }
    );
  });
});
