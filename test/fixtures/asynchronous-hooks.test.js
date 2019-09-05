'use strict';

function Connection() {
  this.saveError = null;
  this.clearError = null;
  this.findError = null;
  this.users = [];
}
Connection.prototype.save = function(users, cb) {
  this.users = users;
  cb(this.saveError);
};
Connection.prototype.clear = function(cb) {
  cb(this.clearError);
};
Connection.prototype.find = function(obj, cb) {
  cb(this.findError, this.users);
};

function User(name) {
  this.name = name;
}

var should = require('should');

describe('Connection', function() {
  var db = new Connection,
    tobi = new User('tobi'),
    loki = new User('loki'),
    jane = new User('jane');

  beforeEach(function(done) {
    db.clear(function(err) {
      if (err) return done(err);
      db.save([tobi, loki, jane], done);
    });
  });

  describe('#find()', function() {
    it('respond with matching records', function(done) {
      db.find({ type: 'User' }, function(err, res) {
        if (err) return done(err);
        res.should.have.length(3);
        done();
      });
    });
  });
});

describe('Connection (save error)', function() {
  var db = new Connection,
    tobi = new User('tobi'),
    loki = new User('loki'),
    jane = new User('jane');

  db.saveError = new Error('Save error');

  beforeEach(function(done) {
    db.clear(function(err) {
      if (err) return done(err);
      db.save([tobi, loki, jane], done);
    });
  });

  describe('#find()', function() {
    it('respond with matching records', function(done) {
      db.find({ type: 'User' }, function(err, res) {
        if (err) return done(err);
        res.should.have.length(3);
        done();
      });
    });
  });
});

