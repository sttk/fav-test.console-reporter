'use strict';

var define = require('@fav/prop.define');
var repeat = require('@fav/text.repeat');
var colors = require('@fav/cli.text-style');
var $tatic = require('./static');

function implement(reporter, envOrColorDepth) {
  define.immutable(reporter, 'colors', colors(envOrColorDepth));
}

define.override($tatic, function output(text) {
  console.log(text);
});

define.override($tatic, function indent(node) {
  return '  ' + repeat('  ', node ? (node.depth - 1) : 0);
});

module.exports = implement;
