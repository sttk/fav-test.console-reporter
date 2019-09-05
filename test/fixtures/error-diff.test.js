'use strict';

var assert = require('assert');

describe('error-diff', function() {

  it('compare same type', function() {
    assert.equal(true, false);
  });

  it('compare different type', function() {
    assert.equal(true, 'true');
  });

  it('compare same content objects', function() {
    var o1 = { a: 1 };
    var o2 = { a: 1 };
    assert.equal(o1, o2);
  });

  it('compare different content objects deeply', function() {
    var o1 = { a: 1 };
    var o2 = { a: 2 };
    assert.deepEqual(o1, o2);
  });

  it('display add diff', function() {
    var o1 = { a: 1 };
    var o2 = { a: 1, b: 2, c: 3 };
    assert.deepEqual(o1, o2);
  });

  it('display delete diff', function() {
    var o1 = { a: 1, b: 2, c: 3 };
    var o2 = { a: 1 };
    assert.deepEqual(o1, o2);
  });

  it('different multiple blocks', function() {
    var o1 = {
      a: true,
      b: {
        c: 'A',
        d: 1,
        f: {
          g: -23,
          i: 'A',
          j: [1, 2, 3],
        },
      },
      k: 1,
      l: 2,
      m: 3,
      n: [4, 5],
    };
    var o2 = {
      a: false,
      b: {
        c: 'A',
        d: 1,
        f: {
          g: -23,
          i: 'A',
          j: [1, 2, 3],
        },
      },
      k: 1,
      l: 2,
      m: 3,
      n: [4, 6],
    };
    assert.deepEqual(o1, o2);
  });

  it('different multiple blocks but nearly', function() {
    var o1 = { a: true, b: { c: 'ABC', d: 1 } };
    var o2 = { a: false, b: { c: 'aaa', d: 1 } };
    assert.deepEqual(o1, o2);
  });
});
