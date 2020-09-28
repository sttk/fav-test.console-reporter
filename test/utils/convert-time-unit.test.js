'use strict';

var colors = require('@fav/cli.text-style');
var assert = require('assert');
var convertTimeUnit = require('../../lib/utils/convert-time-unit');

try {
  assert.equal(convertTimeUnit(0), '0ms');
  assert.equal(convertTimeUnit(123), '123ms');
  assert.equal(convertTimeUnit(1234), '1s');
  assert.equal(convertTimeUnit(12345), '12s');
  assert.equal(convertTimeUnit(123456), '2m');
  assert.equal(convertTimeUnit(1234567), '20m');
  assert.equal(convertTimeUnit(12345678), '3h');
  assert.equal(convertTimeUnit(123456789), '34h');

  console.error(colors.green('✓'), 'lib/utils/convert-time-unit');
} catch (e) {
  console.error(colors.red('×'), 'lib/utils/convert-time-unit');
  console.error(e);
}
