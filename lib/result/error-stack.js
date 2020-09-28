'use strict';

var path = require('path');
var define = require('@fav/prop.define');
var escape = require('@fav/text.escape').RegExp;
var $tatic = require('../static');

var cwdRe = new RegExp(escape(path.join(process.cwd(), path.sep)), 'g');

var testerDir = ['node_modules', '@fav', 'test'].join(escape(path.sep));
var testerRe = new RegExp('\\n\\s*at [^\\n]*' + testerDir + '[^\\n]*', 'g');

define.override($tatic, function formatErrorDetail(node, i, reporter) {
  var output = formatErrorDetail.$uper(node, i, reporter);

  var error = node.error;
  var trace = error.stack.slice(error.toString().length)
    .replace(/\n\s*at/g, '\n' + $tatic.indent() + '    at')
    .replace(cwdRe, '')
    .replace(testerRe, '');

  var colors = reporter.colors;
  return output + colors.gray(trace);
});
