'use strict';

var chkEnv = require('../tool/chk-env');

var should = require('should');
var assert = require('assert');

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
    resolve([tobi, loki, jane]);
  });
};

var tobi = 'Tobi',
    loki = 'Loki',
    jane = 'Jane';

var db = new DB();

if (!chkEnv.isSupportAsyncAwait()) {
  describe('#find()', function() {
    it('respond with matching records', function() {
    });
  });
  return;
}

eval("" +

"beforeEach(async function() {" +
"  await db.clear();" +
"  await db.save([tobi, loki, jane]);" +
"});" +
"" +
"describe('#find()', function() {" +
"  it('respond with matching records', async function() {" +
"    const users = await db.find({ type: 'User' });" +
"    users.should.have.length(3);" +
"  });" +
"});" +
"" +
"");
