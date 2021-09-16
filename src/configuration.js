/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");

const prefix = "markyMarkdown";
const scope = vscode.ConfigurationTarget.Global;

const wordsPerMinuteName = "statsWordsPerMinute";
const showReadingTimeName = "statsShowReadingTime";
const showWordsName = "statsShowWords";
const showLinesName = "statsShowLines";
const showCharactersName = "statsShowCharacters";
const charactersPerAuthorsSheet = "statsCharactersPerAuthorsSheet";
const showAuthorsSheets = "statsShowAuthorsSheets";
const itemSeparatorName = "statsItemSeparator";
const alignmentName = "statsAlignment";

class Configuration {
  static getPrefix() {
    return prefix;
  }

  static getWordsPerMinute() {
    let wpm = 0;

    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      wpm = parseInt(config.get(wordsPerMinuteName));
    }

    return wpm;
  }

  static getAlignment() {
    let alignment = "";

    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      alignment = config.get(alignmentName);
    }

    return alignment;
  }

  static getShowReadingTime() {
    let show = false;

    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      show = config.get(showReadingTimeName);
    }

    return show;
  }

  static getShowWords() {
    let show = false;

    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      show = config.get(showWordsName);
    }

    return show;
  }

  static getShowLines() {
    let show = false;

    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      show = config.get(showLinesName);
    }

    return show;
  }

  static getShowCharacters() {
    let show = false;

    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      show = config.get(showCharactersName);
    }

    return show;
  }

  static getCharactersPerAuthorsSheet() {
    let number = 40000;

    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      number = parseInt(config.get(charactersPerAuthorsSheet));
    }

    return number;
  }

  static getShowAuthorsSheets() {
    let show = false;

    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      show = config.get(showAuthorsSheets);
    }

    return show;
  }

  static getItemSeparator() {
    let separator = "  ";

    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      separator = config.get(itemSeparatorName);
    }

    return separator;
  }

  static async updateWordsPerMinute(newValue) {
    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      await config.update(wordsPerMinuteName, newValue, scope);
    }
  }

  static async updateShowReadingTime(newValue) {
    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      await config.update(showReadingTimeName, newValue, scope);
    }
  }

  static async updateShowWords(newValue) {
    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      await config.update(showWordsName, newValue, scope);
    }
  }

  static async updateShowLines(newValue) {
    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      await config.update(showLinesName, newValue, scope);
    }
  }

  static async updateShowCharacters(newValue) {
    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      await config.update(showCharactersName, newValue, scope);
    }
  }

  static async updateCharactersPerAuthorsSheet(newValue) {
    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      await config.update(charactersPerAuthorsSheet, newValue, scope);
    }
  }

  static async updateShowAuthorsSheets(newValue) {
    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      await config.update(showAuthorsSheets, newValue, scope);
    }
  }

  static async updateItemSeparator(newValue) {
    if (vscode.workspace) {
      const config = vscode.workspace.getConfiguration(prefix);
      await config.update(itemSeparatorName, newValue, scope);
    }
  }
}

module.exports = Configuration;
