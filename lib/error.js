'use strict';

Error.stackTraceLimit = Infinity;

var $tatic = require('./static');
var define = require('@fav/prop.define');
var immutable = define.immutable;
var override = define.override;

function implement(reporter) {
  immutable(reporter, 'errored', []);
  reporter.framework.on('error', onError.bind(reporter));
}

function onError(node) {
  this.errored.push(node);
  $tatic.writeError(this, node);
}

override($tatic, function writeError(reporter, node) {
  var colors = reporter.colors;
  var errNo = reporter.errored.length + ') ';
  var s = colors.red(errNo + $tatic.getNodeTitle(node));
  $tatic.write($tatic.indent(node) + s);
})

override($tatic, function writeErrorTotal(reporter) {
  var colors = reporter.colors;
  var total = reporter.errored.length;
  var s = colors.red(total + ' failing');
  $tatic.write($tatic.indent() + s);
});

/* istanbul ignore next */
override($tatic, function writeErrorTrace(reporter, node, index) {
});

override($tatic, function indent(node) {
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

override($tatic, function getNodeTitle(node) {
  switch (node.type) {
    case 'before': {
      return formatTitle('"before all" hook', node.title);
    }
    case 'after': {
      return formatTitle('"after all" hook', node.title);
    }
    case 'beforeEach': {
      return formatTitle('"before each" hook', node.title, node.node.title);
    }
    case 'afterEach': {
      return formatTitle('"after each" hook', node.title, node.node.title);
    }
    default: {
      return formatTitle(node.title);
    }
  }
});

function formatTitle(first, second, third) {
  var title = first;
  if (second) {
    title += ': ' + second;
  }
  if (third) {
    title += ' for "' + third + '"';
  }
  return title;
}

module.exports = implement;
