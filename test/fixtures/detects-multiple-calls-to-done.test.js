'use strict';

if (typeof setImmediate !== 'function') { // Node.js v0.8
  global.setImmediate = function(fn) {
    setTimeout(fn, 0);
  };
}

it('double done', function(done) {
  // Calling `done()` twice is an error
  setImmediate(done);
  setImmediate(done);
});

