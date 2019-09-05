'use stirct';

var $tatic = require('./static');
var define = require('@fav/prop.define');
var override = define.override;

var diff = require('@fav/text.diff');

override($tatic, function writeErrorTrace(reporter, node, index) {
  writeErrorTrace.$uper(reporter, node, index);

  var indent = $tatic.indent() + '   ';
  var msg = $tatic.getErrorMessage(node);
  var actual = node.error.actual;
  var expected = node.error.expected;

  var colors = reporter.colors;

  if (!$tatic.isDisplayDiff(actual, expected)) {
    this.write(indent + colors.red(msg));
    return;
  }

  indent += ' ';

  var s = '\n' +
    indent + colors.red(msg) + '\n' +
    indent + colors.green('+ expected') + ' ' + colors.red('- actual') + '\n' +
    '\n' +
    $tatic.getDiff(actual, expected, colors, indent);

  $tatic.write(s);
});

override($tatic, function isDisplayDiff(actual, expected) {
  if (actual === undefined && expected === undefined) {
    return false;
  }
  if (objectType(actual) !== objectType(expected)) {
    return false;
  }
  return true;
});

function objectType(v) {
  return Object.prototype.toString.call(v);
}

override($tatic, function getDiff(actual, expected, colors, indent) {
  var actualText = $tatic.valueToText(actual);
  var expectedText = $tatic.valueToText(expected);

  var actualLines = actualText.split('\n');
  var expectedLines = expectedText.split('\n');

  var diffs = diff.lines(actualText, expectedText);
  var st, ed = 0, margin = 4;
  var s = '';

  for (var i = 0, last = diffs.length - 1; i <= last; i++) {
    var d = diffs[i];

    st = d.lines.src.start - margin;
    if (ed === 0 || st <= ed) {
      st = ed;
    } else {
      s += '--\n';
    }

    ed = d.lines.src.start;
    for (; st < ed; st++) {
      s += indent + ' ' + actualLines[st] + '\n';
    }

    ed = d.lines.src.end;
    for (; st < ed; st++) {
      s += indent + '-' + actualLines[st] + '\n';
    }

    st = d.lines.dest.start;
    ed = d.lines.dest.end;
    for (; st < ed; st++) {
      s += indent + '+' + expectedLines[st] + '\n';
    }

    st = d.lines.src.end;
    ed = Math.min(d.lines.src.end + margin, actualLines.length);
    if (i < last) {
      var next = Math.max(diffs[i + 1].lines.src.start - margin, 0);
      if (ed > next) {
        ed = Math.max(next, st);
      }
    }
    for (; st < ed; st++) {
      s += indent + ' ' + actualLines[st] + '\n';
    }
  }

  return s;
});

override($tatic, function valueToText(v) {
  return JSON.stringify(v, undefined, 2).replace(/,\n/g, '\n');;
});

override($tatic, function getErrorMessage(node) {
  return node.error.toString();
});
