'use strict';

var assert = require('assert');
var Framework = require('@fav/test.framework');
var ConsoleReporter = require('../..');
assert.ok(ConsoleReporter(new Framework()) instanceof ConsoleReporter);

require('./convert-time-unit.test.js');
