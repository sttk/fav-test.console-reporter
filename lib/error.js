'use strict';

Error.stackTraceLimit = Infinity;

var define = require('@fav/prop.define');
var $tatic = require('./static');

function implement(reporter) {
  define.immutable(reporter, 'errors', []);
}

define.override($tatic, function onError(node, reporter) {
  reporter.errors.push(node);
  $tatic.outputError(node, reporter);
});

define.override($tatic, function outputError(node, reporter) {
  var colors = reporter.colors;
  var errNo = reporter.errors.length;
  $tatic.output($tatic.indent(node) +
    colors.red(errNo + ') ' + $tatic.formatErrorNodeTitle(node)));
});

define.override($tatic, function indent(node) {
  if (!node) {
    return indent.$uper();
  }

  switch (node.type) {
    case 'beforeEach':
    case 'afterEach': {
      return indent.$uper(node.node);
    }
    default: {
      return indent.$uper(node);
    }
  }
});

define.override($tatic, function formatErrorNodeTitle(node) {
  switch (node.type) {
    case 'before': {
      return '"before all" hook' +
        concatOrEmpty(': ', node.title);
    }
    case 'after': {
      return '"after all" hook' +
        concatOrEmpty(': ', node.title);
    }
    case 'beforeEach': {
      return '"before each" hook' +
        concatOrEmpty(': ', node.title) +
        concatOrEmpty(' for "', node.node.title, '"');
    }
    case 'afterEach': {
      return '"after each" hook' +
        concatOrEmpty(': ', node.title) +
        concatOrEmpty(' for "', node.node.title, '"');
    }
    default: {
      return node.title;
    }
  }
});

function concatOrEmpty(/* ...args */) {
  var ret = '';
  for (var i = 0, n = arguments.length; i < n; i++) {
    var arg = arguments[i];
    if (!arg) {
      return '';
    }
    ret += arg;
  }
  return ret;
}

module.exports = implement;
