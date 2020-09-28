'use strict';

var define = require('@fav/prop.define');
var $tatic = require('./static');

function implement(reporter) {
  define.immutable(reporter, 'skips', []);
}

define.override($tatic, function onSkip(node, reporter) {
  reporter.skips.push(node);
  $tatic.outputSkip(node, reporter);
});

define.override($tatic, function outputSkip(node, reporter) {
  var colors = reporter.colors;
  $tatic.output($tatic.indent(node) + colors.cyan('- ' + node.title));
});

module.exports = implement;
