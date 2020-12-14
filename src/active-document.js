// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");

class ActiveDocument {
  /**
   * Get the number of words for the document.
   */
  static getWordCount() {
    const editor = vscode.window.activeTextEditor;
    const text = editor.document.getText();
    // unicode match for any letter or number
    let matches = text.match(/[\p{Letter}\p{Number}]+/giu);

    if (matches === null) {
      return 0;
    }

    return matches.length;
  }

  /**
   * Get the reading time in minutes. It is based on a reading speed of 250 words per minute.
   *
   */
  static getReadingTime() {
    const words = this.getWordCount();

    if (words === 0) {
      return 0;
    }

    return Math.ceil(words / 250);
  }

  /**
   * Get the number of characters including new line characters.
   *
   */
  static getCharacterCount() {
    const editor = vscode.window.activeTextEditor;
    const text = editor.document.getText();
    return text.length;
  }

  /**
   * Get the number of lines.
   *
   */
  static getLineCount() {
    return vscode.window.activeTextEditor.document.lineCount;
  }
}

module.exports = ActiveDocument;
