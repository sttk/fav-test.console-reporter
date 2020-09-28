'use strict';

var path = require('path');
var parseArgv = require('@fav/cli.parse-argv');
var Framework = require('@fav/test.framework');
var define = require('@fav/prop.define');

var ConsoleReporter = require('../..');

// Because error.toString() returns a different string by Node version.
var $tatic = require('../../lib/static');
var define = require('@fav/prop.define');
var assert = require('assert');
define.override($tatic, function getErrorMessage(node) {
  var versions = process.version.slice(1).split('.');
  var majorVersion = Number(versions[0]);
  if (majorVersion >= 12) {
    return getErrorMessage.$uper(node);
  }

  var error = node.error;
  if (error instanceof assert.AssertionError) {
    return error.constructor.name + ': ' + error.operator;
  }
  return getErrorMessage.$uper(node);
});

var colorDepth;
var argv = parseArgv({
  color: { type: 'boolean' },
  delay: { type: 'boolean' },
});

switch (argv.options.color) {
  case true: {
    colorDepth = 4;
    break;
  }
  case false: {
    colorDepth = 1;
    break;
  }
}

var framework = new Framework();
var reporter = new ConsoleReporter(framework, colorDepth);

framework._slow = 1000;

global.describe = framework.suite;
global.it = framework.test;
global.before = framework.before;
global.after = framework.after;
global.beforeEach = framework.beforeEach;
global.afterEach = framework.afterEach;

if (argv.options.delay) {
  global.run = run;
}

describe.only = framework.onlySuite;
describe.skip = framework.skipSuite;
it.only = framework.onlyTest;
it.skip = framework.skipTest;

require(path.resolve(argv.args[0]));

if (!argv.options.delay) {
  run();
}

function run() {
  framework.run(function() {
    process.on('exit', onExit);
  });
}

function onExit() {
  framework.emit('result');

  if (reporter.errors && reporter.errors.length > 0) {
    console.log();
    console.log();
    process.exit(1);
  }
}
