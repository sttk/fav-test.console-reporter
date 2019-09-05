'use strict';

var $tatic = require('./static');
var define = require('@fav/prop.define');
var mutable = define.mutable;
var override = define.override;

function implement(reporter) {
  mutable(reporter, 'toBeBreakLine', true);
  reporter.framework.on('start', onStart.bind(reporter));
}

function onStart(node) {
  switch (node.type) {
    case 'suite': {
      if (node.depth === 1) {
        $tatic.write('');
        this.toBeBreakLine = true;
      }
      $tatic.writeSuite(this, node);
      break;
    }
    case 'test': {
      if (node.depth === 1) {
        if (this.toBeBreakLine) {
          $tatic.write('');
        }
        this.toBeBreakLine = false;
      }
      break;
    }
  }
}

override($tatic, function writeSuite(reporter, node) {
  $tatic.write($tatic.indent(node) + node.title);
});

module.exports = implement;
