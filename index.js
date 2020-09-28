'use strict';

var implementEvents = require('./lib/events');
var implementOutput = require('./lib/output');
var implementSuite = require('./lib/suite');
var implementPass = require('./lib/pass');
var implementSkip = require('./lib/skip');
var implementError = require('./lib/error');

require('./lib/result/');
require('./lib/result/error-tree');
require('./lib/result/error-diff');
require('./lib/result/error-stack');

function ConsoleReporter(fw, envOrColorDepth) {
  /* istanbul ignore if */
  if (!(this instanceof ConsoleReporter)) {
    return new ConsoleReporter(envOrColorDepth);
  }

  implementEvents(this, fw);
  implementOutput(this, envOrColorDepth);
  implementSuite(this);
  implementPass(this);
  implementSkip(this);
  implementError(this);
}

module.exports = ConsoleReporter;
