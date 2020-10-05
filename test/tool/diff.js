'use strict';

var diff = require('@fav/text.diff');

function diffLines(srcText, dstText) {
  var srcLines = srcText.split('\n');
  var dstLines = dstText.split('\n');

  return diff.lines(srcText, dstText).reduce(function(s, d) {
    var src = d.lines.src;
    var dst = d.lines.dest;

    s += lineNo(src) + d.type + lineNo(dst);

    if (d.type === 'd' || d.type === 'c') {
      for (var i0 = src.start; i0 < src.end; i0++) {
        s += '\n<' + srcLines[i0];
      }
    }
    if (d.type === 'c') {
      s += '\n---';
    }
    if (d.type === 'a' || d.type === 'c') {
      for (var i1 = dst.start; i1 < dst.end; i1++) {
        s += '\n>' + dstLines[i1];
      }
    }

    s += '\n';
    return s;
  }, '').slice(0, -1);
}

function lineNo(range) {
  if (range.start === range.end) {
    return range.start;
  }

  var st = range.start + 1;
  var ed = range.end;
  if (st === ed) {
    return st;
  }

  return st + ',' + ed;
}

module.exports = diffLines;
