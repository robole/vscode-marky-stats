/* eslint-disable import/no-unresolved, node/no-missing-require */
const assert = require("assert");
const path = require("path");
const vscode = require("vscode");
const Configuration = require("../../src/configuration");

const defaultWordsPerMin = 250;
const defaultShowReadingTime = true;
const defaultShowLines = false;
const defaultShowCharacters = false;
const defaultShowWords = false;
const defaultItemSeparator = "  ";
const defaultAlignment = "Left";

suite("Configuration", () => {
  // IF YOU CHANGED YOUR USER SETTINGS FOR THE EXTENSION, SOME OF THESE MIGHT FAIL!!

  test('get the default value of "Stats Words Per Minute"', () => {
    const wpm = Configuration.getWordsPerMinute();
    assert.strictEqual(wpm, defaultWordsPerMin);
  });

  test('get the default value of "Stats Alignment"', () => {
    const alignment = Configuration.getAlignment();
    assert.strictEqual(alignment, defaultAlignment);
  });

  test('get the default value of "Stats Show Reading Time"', () => {
    const show = Configuration.getShowReadingTime();
    assert.strictEqual(show, defaultShowReadingTime);
  });

  test('get the default value of "Stats Show Words"', () => {
    const show = Configuration.getShowWords();
    assert.strictEqual(show, defaultShowWords);
  });

  test('get the default value of "Stats Show Lines"', () => {
    const show = Configuration.getShowLines();
    assert.strictEqual(show, defaultShowLines);
  });

  test('get the default value of "Stats Show Characters"', () => {
    const show = Configuration.getShowCharacters();
    assert.strictEqual(show, defaultShowCharacters);
  });

  test('get the default value of "Stats Item Separator"', () => {
    const sep = Configuration.getItemSeparator();
    assert.strictEqual(sep, defaultItemSeparator);
  });

  test('update the value of "Stats Words Per Minute" ', async function () {
    const newValue = 300;
    await Configuration.updateWordsPerMinute(newValue);
    const configWordsPerMin = Configuration.getWordsPerMinute();

    await Configuration.updateWordsPerMinute(defaultWordsPerMin); //reset to default value

    assert.strictEqual(configWordsPerMin, newValue);
  });

  test('update the value of "Stats Show Reading Time"', async function () {
    const newValue = false;
    await Configuration.updateShowReadingTime(newValue);
    const configWordsPerMin = Configuration.getShowReadingTime();

    await Configuration.updateShowReadingTime(defaultShowReadingTime); //reset to default value

    assert.strictEqual(configWordsPerMin, newValue);
  });

  test('update the value of "Stats Show Words"', async function () {
    const newValue = false;
    await Configuration.updateShowWords(newValue);
    const configValue = Configuration.getShowWords();

    await Configuration.updateShowWords(defaultShowWords); //reset to default value

    assert.strictEqual(configValue, newValue);
  });

  test('update the value of "Stats Show Characters"', async function () {
    const newValue = false;
    await Configuration.updateShowCharacters(newValue);
    const configValue = Configuration.getShowCharacters();

    await Configuration.updateShowCharacters(defaultShowCharacters); //reset to default value

    assert.strictEqual(configValue, newValue);
  });

  test('update the value of "Stats Show Lines"', async function () {
    const newValue = false;
    await Configuration.updateShowLines(newValue);
    const configValue = Configuration.getShowLines();

    await Configuration.updateShowLines(defaultShowLines); //reset to default value

    assert.strictEqual(configValue, newValue);
  });
});
