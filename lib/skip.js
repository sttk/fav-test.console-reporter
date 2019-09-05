'use strict';

var $tatic = require('./static');
var define = require('@fav/prop.define');
var immutable = define.immutable;
var override = define.override;

function implement(reporter) {
  immutable(reporter, 'skipped', []);
  reporter.framework.on('skip', onSkip.bind(reporter));
}

function onSkip(node) {
  this.skipped.push(node);
  $tatic.writeSkip(this, node);
}

override($tatic, function writeSkip(reporter, node) {
  var colors = reporter.colors;
  var s = colors.cyan('- ' + node.title);
  $tatic.write($tatic.indent(node) + s);
});

override($tatic, function writeSkipTotal(reporter) {
  var colors = reporter.colors;
  var s = colors.cyan(reporter.skipped.length + ' pending');
  $tatic.write($tatic.indent() + s);
});

module.exports = implement;
