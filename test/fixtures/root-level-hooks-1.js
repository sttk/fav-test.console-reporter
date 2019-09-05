'use strict';

beforeEach(function() {
  console.log('before every test in every file');
});

it('test', function() {
  console.log('test run');
});

describe('suite1', function() {
  it('test1', function() {
    console.log('test1 run');
  });

  describe('suite2', function() {
    it('test2', function() {
      console.log('test2 run');
    });
  });
});
