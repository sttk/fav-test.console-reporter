'use strict';

var colors = require('@fav/cli.text-style');
var assert = require('assert');
var $tatic = require('../../lib/static');
require('../../lib/writer');

try {
  assert.equal($tatic.convertTimeUnit(123), '123ms');
  assert.equal($tatic.convertTimeUnit(1234), '1s');
  assert.equal($tatic.convertTimeUnit(12345), '12s');
  assert.equal($tatic.convertTimeUnit(123456), '2m');
  assert.equal($tatic.convertTimeUnit(1234567), '21m');
  assert.equal($tatic.convertTimeUnit(12345678), '3h');
  console.log(colors.green('✓'), 'lib/convert-time-unit');;
} catch (e) {
  console.log(colors.red('×'), 'lib/convert-time-unit');;
}
