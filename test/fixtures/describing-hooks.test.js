'use strict';

describe('hooks (before/after)', function() {

  before(function() {
    // runs before all tests in this block
    throw new Error('runs before all tests in this block');
  });

  after(function() {
    // runs after all tests in this block
    throw new Error('runs after all tests in this block');
  });

  beforeEach(function() {
    // runs before each test in this block
    throw new Error('runs before each test in this block');
  });

  afterEach(function() {
    // runs after each test in this block
    throw new Error('runs after each test in this block');
  });

  // test cases
  it('test case 1', function() {
  });
  it('test case 2', function() {
  });
});

describe('describing hooks (before/after)', function() {

  before('BeforeHook', function() {
    // runs before all tests in this block
    throw new Error('runs before all tests in this block');
  });

  after('AfterHook', function() {
    // runs after all tests in this block
    throw new Error('runs after all tests in this block');
  });

  beforeEach('BeforeEachHook', function() {
    // runs before each test in this block
    throw new Error('runs before each test in this block');
  });

  afterEach('AfterEachHook', function() {
    // runs after each test in this block
    throw new Error('runs after each test in this block');
  });

  // test cases
  it('test case 1', function() {
  });
  it('test case 2', function() {
  });
});

describe('hooks (beforeEach/afterEach)', function() {

  beforeEach(function() {
    // runs before each test in this block
    throw new Error('runs before each test in this block');
  });

  afterEach(function() {
    // runs after each test in this block
    throw new Error('runs after each test in this block');
  });

  // test cases
  it('test case 1', function() {
  });
  it('test case 2', function() {
  });
});

describe('describing hooks (beforeEach/afterEach)', function() {

  beforeEach('BeforeEachHook', function() {
    // runs before each test in this block
    throw new Error('runs before each test in this block');
  });

  afterEach('AfterEachHook', function() {
    // runs after each test in this block
    throw new Error('runs after each test in this block');
  });

  // test cases
  it('test case 1', function() {
  });
  it('test case 2', function() {
  });
});

