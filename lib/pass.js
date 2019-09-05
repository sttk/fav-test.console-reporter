'use strict';

var $tatic = require('./static');
var define = require('@fav/prop.define');
var immutable = define.immutable;
var override = define.override;

function implement(reporter) {
  immutable(reporter, 'passed', []);
  reporter.framework.on('succeed', onSucceed.bind(reporter));
}

function onSucceed(node) {
  this.passed.push(node);
  $tatic.writePass(this, node);
}

override($tatic, function writePass(reporter, node) {
  var colors = reporter.colors;
  var s = colors.green('✓ ') +
          colors.gray(node.title) +
          formatPassDuration(reporter, node);
  $tatic.write($tatic.indent(node) + s);
});

override($tatic, function writePassTotal(reporter) {
  var colors = reporter.colors;
  var s = colors.green(reporter.passed.length + ' passing ') +
          colors.gray(formatPassTotalDuration(reporter));
  $tatic.write($tatic.indent() + s);
});

function formatPassDuration(reporter, node) {
  var colors = reporter.colors;
  var duration = node.endTime - node.startTime;
  if (duration > node.slow) {
    return colors.red(' (' + duration + 'ms)');
  } else if (duration > node.slow / 2) {
    return colors.brightYellow(' (' + duration + 'ms)');
  } else {
    return '';
  }
}

function formatPassTotalDuration(reporter) {
  var duration = reporter.passed.reduce(totalUpDuration, 0);
  return '(' + $tatic.convertTimeUnit(duration) + ')';
}

function totalUpDuration(total, node) {
  return total + (node.endTime - node.startTime);
}

module.exports = implement;
