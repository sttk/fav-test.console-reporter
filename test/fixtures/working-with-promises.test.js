'use strict';

var Promise = (typeof Promise === 'function') ? Promise :
              require('promise-polyfill');
var assert = require('assert');
var should = require('should');

function DB() {
}

DB.prototype.clear = function() {
  return new Promise(function (cb) {
    cb();
  });
};

DB.prototype.save = function() {
  return new Promise(function (cb) {
    cb();
  });
};

DB.prototype.find = function() {
  return new Promise(function(resolve) {
    resolve(['Tobi', 'Loki', 'Jane']);
  });
};

var tobi = 'Tobi',
    loki = 'Loki',
    jane = 'Jane';

var db = new DB();

beforeEach(function() {
  return db.clear()
    .then(function() {
      return db.save([tobi, loki, jane]);
    });
});

describe('#find()', function() {
  it('respond with matching records', function() {
    return db.find({ type: 'User' }).should.eventually.have.length(3);
  });
  it('should complete this test', function(done) {
    return new Promise(function(resolve) {
      assert.ok(true);
      resolve();
    }).then(done);
  });
});

