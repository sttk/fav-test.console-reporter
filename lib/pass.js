'use strict';

var define = require('@fav/prop.define');
var $tatic = require('./static');

function implement(reporter) {
  define.immutable(reporter, 'passes', []);
}

define.override($tatic, function onSucceed(node, reporter) {
  reporter.passes.push(node);
  $tatic.outputPass(node, reporter);
});

define.override($tatic, function outputPass(node, reporter) {
  var colors = reporter.colors;
  $tatic.output($tatic.indent(node) +
    colors.green('✓ ') + colors.gray(node.title) +
    $tatic.formatDuration(node, reporter));
});

define.override($tatic, function formatDuration(node, reporter) {
  var colors = reporter.colors;
  var duration = node.endTime - node.startTime;
  if (duration > node.slow) {
    return colors.red(' (' + duration + 'ms)');
  } else if (duration > node.slow / 2) {
    return colors.brightYellow(' (' + duration + 'ms)');
  } else {
    return '';
  }
});

module.exports = implement;
