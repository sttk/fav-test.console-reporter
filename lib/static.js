'use strict';

module.exports = {
  onStart: noop,
  onEnd: noop,
  onSucceed: noop,
  onError: noop,
  onRetry: noop,
  onSkip: noop,
  onResult: noop,
};

function noop() {}
