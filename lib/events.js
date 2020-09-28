'use strict';

var $tatic = require('./static');

function implement(reporter, fw) {
  fw.on('start', function(node) {
    $tatic.onStart(node, reporter);
  });

  fw.on('end', function(node) {
    $tatic.onEnd(node, reporter);
  });

  fw.on('succeed', function(node) {
    $tatic.onSucceed(node, reporter);
  });

  fw.on('error', function(node) {
    $tatic.onError(node, reporter);
  });

  fw.on('retry', function(node) {
    $tatic.onRetry(node, reporter);
  });

  fw.on('skip', function(node) {
    $tatic.onSkip(node, reporter);
  });

  fw.on('result', function() {
    $tatic.onResult(fw, reporter);
  });
}

module.exports = implement;
