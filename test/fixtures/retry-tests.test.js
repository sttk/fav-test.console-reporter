'use strict';

var Promise = (typeof Promise === 'function') ? Promise :
              require('promise-polyfill');
var chkEnv = require('../tool/chk-env');

var chai = require('chai');
if (chkEnv.isSupportES6()) {
  var chaiAsPromised = require('chai-as-promised');
  chai.use(chaiAsPromised);
}
var expect = chai.expect;

var browser = {
  get: function() {},
};
var count = 0;
var $ = function() {
  return {
    isDisplayed: function() {
      count++;
      return Promise.resolve(count > 3);
    },
  };
};

describe('retries (2 times)', function() {
  // Retry all tests in this suite up to 4 times
  this.retries(4);

  before(function() {
    count = 0;
  });

  beforeEach(function() {
    browser.get('http://www.yahoo.com');
  });

  it('should succeed on the 3rd try', function() {
    // Specify this test to only retry up to 2 times
    this.retries(2);
    if (chkEnv.isSupportES6()) {
      return expect($('.foo').isDisplayed()).to.eventually.be.true;
    } else {
      return $('.foo').isDisplayed().then(function(value) {
        expect(value).to.be.true;
      });
    }
  });
});

describe('retries (3 times)', function() {
  // Retry all tests in this suite up to 4 times
  this.retries(4);

  before(function() {
    count = 0;
  });

  beforeEach(function() {
    browser.get('http://www.yahoo.com');
  });

  it('should succeed on the 3rd try', function() {
    this.retries(3);
    if (chkEnv.isSupportES6()) {
      return expect($('.foo').isDisplayed()).to.eventually.be.true;
    } else {
      return $('.foo').isDisplayed().then(function(value) {
        expect(value).to.be.true;
      });
    }
  });
});

