'use strict';

describe('durations', function() {
  this.slow(10000);

  describe('when slow', function() {
    it('should highlight in red', function(done) {
      this.slow(200);
      setTimeout(done, 201);
    });
  });

  describe('when reasonable', function() {
    it('should highlight in yellow', function(done) {
      this.slow(400);
      setTimeout(done, 201);
    });
  });

  describe('when fast', function() {
    it('should highlight in green', function(done) {
      setTimeout(done, 200);
    });
  });
});

