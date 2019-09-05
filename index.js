'use strict';

var define = require('@fav/prop.define');
var immutable = define.immutable;

var colors = require('@fav/cli.text-style');

var implementWriter = require('./lib/writer');
var implementSuite = require('./lib/suite');
var implementPass = require('./lib/pass');
var implementSkip = require('./lib/skip');
var implementError = require('./lib/error');
var implementResult = require('./lib/result');

require('./lib/error-node-tree');
require('./lib/error-diff');
require('./lib/error-stack');

function ConsoleReporter(framework, envOrColorDepth) {
  if (!(this instanceof ConsoleReporter)) {
    return new ConsoleReporter(framework, envOrColorDepth);
  }

  immutable(this, 'framework', framework);
  immutable(this, 'colors', colors(envOrColorDepth));

  implementWriter(this);
  implementSuite(this);
  implementPass(this);
  implementSkip(this);
  implementError(this);
  implementResult(this);
}

module.exports = ConsoleReporter;
