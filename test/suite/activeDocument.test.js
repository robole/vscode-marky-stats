/* eslint-disable import/no-unresolved, node/no-missing-require */
const assert = require("assert");
const path = require("path");
const vscode = require("vscode");
const ActiveDocument = require("../../src/activeDocument");
const Configuration = require("../../src/configuration");

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

	test("getReadingTime for english text", (done) => {
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

	test("getReadingTime for russian text", (done) => {
		vscode.workspace.openTextDocument(path.join(__dirname, "test-ru.md")).then(
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

	test("getReadingTime should change if the \"Stats Words Per Minute\" setting is changed", async function () {
		let document = await vscode.workspace.openTextDocument(path.join(__dirname, "test-en.md"));
		await vscode.window.showTextDocument(document);

		await Configuration.updateWordsPerMinute(15);
		const readingTime = ActiveDocument.getReadingTime();

		await Configuration.updateWordsPerMinute(250); //reset to default

		assert.strictEqual(readingTime, 3);
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
