'use stirct';

describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(function(err) {
        if (err) done(err);
        else done();
      });
    });
    it('should save without error (2)', function(done) {
      var user = new User('Luna');
      user.save(done);
    });
  });
});

function User(name) {
}
User.prototype.save = function(cb) {
  setTimeout(function() {
    cb();
  }, 1000);
};

