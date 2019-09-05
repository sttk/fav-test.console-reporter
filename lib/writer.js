'use strict';

var $tatic = require('./static');
var define = require('@fav/prop.define');
var override = define.override;

var repeat = require('@fav/text.repeat');

function implement(reporter) {
  override(reporter, write);
}

function write(s) {
  $tatic.write(s);
}

override($tatic, function write(s) {
  console.log(s);
});

override($tatic, function indent(node) {
  return '  ' + repeat('  ', node ? (node.depth - 1) : 0);
});

override($tatic, function convertTimeUnit(tm) {
  if (tm < 1000) {
    return Math.round(tm) + 'ms';
  }

  tm /= 1000;
  if (tm < 60) {
    return Math.round(tm) + 's';
  }

  tm /= 60;
  if (tm < 60) {
    return Math.round(tm) + 'm';
  }

  tm /= 60;
  return Math.round(tm) + 'h';
});

module.exports = implement;
