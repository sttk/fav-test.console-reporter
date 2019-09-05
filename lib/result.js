'use strict';

var $tatic = require('./static');
var define = require('@fav/prop.define');
var override = define.override;

function implement(reporter) {
  reporter.framework.on('result', onResult.bind(reporter));
}

function onResult() {
  $tatic.write('');
  $tatic.write('');

  $tatic.writePassTotal(this);

  if (this.skipped.length > 0) {
    $tatic.writeSkipTotal(this);
  }

  if (this.errored.length > 0) {
    $tatic.writeErrorTotal(this);
    for (var i = 0, n = this.errored.length; i < n; i++) {
      var node = this.errored[i];
      $tatic.write('');
      $tatic.writeErrorTrace(this, node, i);
    }
  }

  $tatic.write('');
}

/* istanbul ignore next */
override($tatic, function writeErrorTrace(reporter, node, index) {
});

module.exports = implement;
