'use strict';

var assert = require('assert');
var colors = require('@fav/cli.text-style');
var inspect = require('../../lib/utils/inspect');

try {
  assert.equal(inspect(undefined), 'undefined');
  assert.equal(inspect(null), 'null');
  assert.equal(inspect(true), 'true');
  assert.equal(inspect(false), 'false');
  assert.equal(inspect(0), '0');
  assert.equal(inspect(123), '123');
  assert.equal(inspect(''), '""');
  assert.equal(inspect('abc'), '"abc"');
  assert.equal(inspect(Symbol('abc')), 'Symbol(abc)');

  assert.equal(inspect([]), '[]');
  assert.equal(inspect([1]), '[\n  1\n]');
  assert.equal(inspect([true, false]), '[\n  true\n  false\n]');
  assert.equal(inspect([[1, 2], ['a', 'b']]),
    '[\n  [\n    1\n    2\n  ]\n  [\n    "a"\n    "b"\n  ]\n]');

  assert.equal(inspect({ }), '{}');
  assert.equal(inspect({ a: undefined }), '{\n  "a": undefined\n}');
  assert.equal(inspect({ a: null }), '{\n  "a": null\n}');
  assert.equal(inspect({ a: true }), '{\n  "a": true\n}');
  assert.equal(inspect({ a: 0 }), '{\n  "a": 0\n}');
  assert.equal(inspect({ a: '' }), '{\n  "a": ""\n}');
  assert.equal(inspect({ a: 123, b: 'abc' }),
    '{\n  "a": 123\n  "b": "abc"\n}');

  assert.equal(inspect({
    a: [1, 2, 3],
    b: { c: 'D', e: 'F' },
  }), '{\n' +
  '  "a": [\n' +
  '    1\n' +
  '    2\n' +
  '    3\n' +
  '  ]\n' +
  '  "b": {\n' +
  '    "c": "D"\n' +
  '    "e": "F"\n' +
  '  }\n' +
  '}');

  console.error(colors.green('✓'), 'lib/utils/inspect');
} catch (e) {
  console.error(colors.red('×'), 'lib/utils/inspect');
  console.error(e);
}
