'use strict';

describe('hooks', function() {

  before(function() {
    // runs before all tests in this block
    console.log('runs before all tests in this block');
  });

  after(function() {
    // runs after all tests in this block
    console.log('runs after all tests in this block');
  });

  beforeEach(function() {
    // runs before each test in this block
    console.log('runs before each test in this block');
  });

  afterEach(function() {
    // runs after each test in this block
    console.log('runs after each test in this block');
  });

  // test cases
  it('test case 1', function() {
  });
  it('test case 2', function() {
  });
});

