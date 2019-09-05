'use strict';

// Suite Level

describe('a suite of tests', function() {
  this.slow(100);
  this.timeout(500);

  it('should take less than 500ms', function(done) {
    setTimeout(done, 300);
  });

  it('should take less than 500ms as well', function(done) {
    setTimeout(done, 250);
  });
});

describe('a suite of tests (error)', function() {
  this.slow(100);
  this.timeout(200);

  it('should take less than 200ms', function(done) {
    setTimeout(done, 300);
  });

  it('should take less than 200ms as well', function(done) {
    setTimeout(done, 250);
  });
});

// Test level

it('should take less than 500ms', function(done) {
  this.slow(100);
  this.timeout(500);
  setTimeout(done, 300);
});
it('should take less than 200ms (error)', function(done) {
  this.slow(100);
  this.timeout(200);
  setTimeout(done, 300);
});

describe('a suite of tests (hook)', function() {
  this.slow(100);
  beforeEach(function(done) {
    this.timeout(3000);
    setTimeout(done, 2500);
  });

  it('test', function() {
  });
});

describe('a suite of tests (hook error)', function() {
  this.slow(100);
  beforeEach(function(done) {
    this.timeout(300);
    setTimeout(done, 500);
  });

  it('test', function() {
  });
});

