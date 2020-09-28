'use strict';

function convertTimeUnit(msec) {
  if (msec < 1000) {
    return Math.round(msec) + 'ms';
  }

  var sec = msec / 1000;
  if (sec < 60) {
    return Math.floor(sec) + 's';
  }

  var min = sec / 60;
  if (min < 60) {
    return Math.floor(min) + 'm';
  }

  var hour = min / 60;
  return Math.floor(hour) + 'h';
}

module.exports = convertTimeUnit;
