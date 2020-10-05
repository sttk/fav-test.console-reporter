'use strict';

var $tatic = require('./static');
var define = require('@fav/prop.define');

function implement(reporter) {
  define.mutable(reporter, 'toBeBreakLine', true);
}

define.override($tatic, function onStart(node, reporter) {
  switch (node.type) {
    case 'suite': {
      if (node.depth === 1) {
        $tatic.output('');
        reporter.toBeBreakLine = true;
      }
      $tatic.outputSuite(node, reporter);
      break;
    }
    case 'test': {
      if (node.depth === 1) {
        if (reporter.toBeBreakLine) {
          $tatic.output('');
        }
        reporter.toBeBreakLine = false;
      }
      break;
    }
  }
});

define.override($tatic, function outputSuite(node, reporter) {
  $tatic.output($tatic.indent(node) + node.title);
});

module.exports = implement;

