/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable node/no-missing-require */
/* eslint-disable import/no-unresolved */
const vscode = require("vscode");
const config = require("./configuration");

class ActiveDocument {
	/**
	 * Get the number of words for the document.
	 */
	static getWordCount() {
		const editor = vscode.window.activeTextEditor;

		if (editor !== undefined && editor.document !== undefined) {
			const text = editor.document.getText();

			// unicode match for any letter or number
			let matches = text.match(/[\p{Letter}\p{Number}]+/giu);

			if (matches !== null) {
				return matches.length;
			}
		}

		return 0;
	}

	/**
	 * Get the reading time in minutes. It is based on a reading speed of 250 words per minute.
	 *
	 */
	static getReadingTime() {
		const words = this.getWordCount();
		const wordsPerMin = config.getWordsPerMinute();

		if (words === 0) {
			return 0;
		}

		return Math.ceil(words / wordsPerMin);
	}

	/**
	 * Get the number of characters including new line characters.
	 *
	 */
	static getCharacterCount() {
		const editor = vscode.window.activeTextEditor;

		if (editor !== undefined && editor.document !== undefined) {
			const text = editor.document.getText();
			return text.length;
		}

		return 0;
	}

	/**
	 * Get the number of lines.
	 *
	 */
	static getLineCount() {
		const editor = vscode.window.activeTextEditor;

		if (editor !== undefined && editor.document !== undefined) {
			return editor.document.lineCount;
		}

		return 0;
	}
}

module.exports = ActiveDocument;
