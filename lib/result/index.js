'use strict';

var define = require('@fav/prop.define');
var $tatic = require('../static');
var convertTimeUnit = require('../utils/convert-time-unit');

define.override($tatic, function onResult(fw, reporter) {
  $tatic.output('');
  $tatic.output('');

  $tatic.outputTotalPasses(reporter);

  if (reporter.skips.length > 0) {
    $tatic.outputTotalSkips(reporter);
  }

  if (reporter.errors.length > 0) {
    $tatic.outputTotalErrors(reporter);
  }

  $tatic.output('');
});

define.override($tatic, function outputTotalPasses(reporter) {
  var colors = reporter.colors;
  $tatic.output($tatic.indent() +
     colors.green(reporter.passes.length + ' passing ') +
     colors.gray($tatic.formatTotalPassesDuration(reporter)));
});

define.override($tatic, function formatTotalPassesDuration(reporter) {
  var duration = reporter.passes.reduce(sumDuration, 0);
  return '(' + convertTimeUnit(duration) + ')';
});

function sumDuration(total, node) {
  return total + (node.endTime - node.startTime);
}

define.override($tatic, function outputTotalSkips(reporter) {
  var colors = reporter.colors;
  $tatic.output($tatic.indent() +
    colors.cyan(reporter.skips.length + ' pending'));
});

define.override($tatic, function outputTotalErrors(reporter) {
  var colors = reporter.colors;
  var errCnt = reporter.errors.length;
  $tatic.output($tatic.indent() + colors.red(errCnt + ' failing'));

  for (var i = 0, n = reporter.errors.length; i < n; i++) {
    var node = reporter.errors[i];
    $tatic.output('');
    $tatic.output($tatic.formatErrorDetail(node, i, reporter));
  }
});

/* istanbul ignore next */
define.override($tatic, function formatErrorDetail(node, i, reporter) {
  var colors = reporter.colors;
  var indent = $tatic.indent();
  var errNo = $tatic.getErrorNo(i);
  return indent + errNo + $tatic.formatErrorNodeTitle(node);
});

define.override($tatic, function getErrorNo(i) {
  return (i + 1) + ') ';
});
