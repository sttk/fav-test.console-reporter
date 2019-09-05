'use strict';

var $tatic = require('./static');
var define = require('@fav/prop.define');
var override = define.override;

var path = require('path');
var reEscape = require('@fav/text.escape').RegExp;

var cwdRe = new RegExp(reEscape(path.join(process.cwd(), path.sep)), 'g');
var testerDir = ['node_modules', '@fav', 'test'].join(reEscape(path.sep));
var testerRe = new RegExp('\\n\\s*at [^\\n]*' + testerDir + '[^\\n]*', 'g');

override($tatic, function writeErrorTrace(reporter, node, index) {
  writeErrorTrace.$uper(reporter, node, index);

  var error = node.error;
  var indent = $tatic.indent() + '   ';
  var sep = '\n' + indent + ' at';

  var trace = error.stack.slice(error.toString().length)
    .replace(/\n\s*at/g, sep)
    .replace(cwdRe, '')
    .replace(testerRe, '')
    .slice(1); // Remove head EOL

  $tatic.write(reporter.colors.gray(trace));
});
