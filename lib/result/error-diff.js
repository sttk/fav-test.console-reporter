'use strict';

var define = require('@fav/prop.define');
var isPlainObject = require('@fav/type.is-plain-object');
var repeat = require('@fav/text.repeat');
var diff = require('@fav/text.diff');
var inspect = require('../utils/inspect');
var $tatic = require('../static');

define.override($tatic, function formatErrorDetail(node, i, reporter) {
  var output = formatErrorDetail.$uper(node, i, reporter);

  var colors = reporter.colors;
  var errNo = $tatic.getErrorNo(i);
  var indent = '\n' + $tatic.indent() + repeat(' ' , errNo.length);

  var expected = inspect(node.error.expected);
  var actual = inspect(node.error.actual);
  output += formatDiff(expected, actual, indent, colors);

  return output;
});

function formatDiff(expected, actual, indent, colors) {
  var srcLines = expected.split('\n');
  var destLines = actual.split('\n');
  var diffs = diff.lines(expected, actual);
  if (diffs.length === 0) {
    return '';
  }

  var ret = '';
  ret += indent + colors.green('+ expected') + ' ' + colors.red('- actual');
  ret += '\n';

  var d = diffs[0];
  var type = d.type;
  var src = d.lines.src;
  var st = Math.max(0, src.start - 4);

  for (var i0 = st; i0 < src.start; i0++) {
    ret += indent + ' ' + srcLines[i0];
  }

  for (var i1 = 0, n = diffs.length; i1 < n; i1++) {
    var dest = d.lines.dest;

    if (type === 'c' || type === 'a') {
      for (var j0 = dest.start; j0 < dest.end; j0++) {
        ret += indent + colors.red('-' + destLines[j0]);
      }
    }
    if (type === 'c' || type === 'd') {
      for (var j1 = src.start; j1 < src.end; j1++) {
        ret += indent + colors.green('+' + srcLines[j1]);
      }
    }

    var ed = Math.min(srcLines.length, src.end + 4);
    if (i1 === diffs.length - 1) {
      for (var j2 = src.end; j2 < ed; j2++) {
        ret += indent + ' ' + srcLines[j2];
      }
      break;
    }

    d = diffs[i1 + 1];
    type = d.type;
    src = d.lines.src;
    if (src.start < ed) {
      for (var j3 = dest.end; j3 < src.start; j3++) {
        ret += indent + ' ' + srcLines[j3];
      }
      continue;
    }

    for (var j4 = dest.end; j4 < ed; j4++) {
      ret += indent + ' ' + srcLines[j4];
    }
    ret += '\n--';
    st = Math.max(0, src.start - 4);
    for (var j5 = st; j5 < src.start; j5++) {
      ret += indent + ' ' + srcLines[j5];
    }
  }

  ret += '\n';
  return ret;
}

