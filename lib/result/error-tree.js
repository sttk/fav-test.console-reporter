'use strict';

var define = require('@fav/prop.define');
var repeat = require('@fav/text.repeat');
var $tatic = require('../static');

define.override($tatic, function formatErrorDetail(node, index, reporter) {
  var colors = reporter.colors;
  var tree = $tatic.getErrorNodeTree(node);

  var errNo = $tatic.getErrorNo(index);
  var indent = $tatic.indent();
  var output = indent + errNo + $tatic.formatErrorNodeTitle(tree[0]);

  indent = '\n' + indent + repeat(' ' , errNo.length);
  var reason = indent + $tatic.getErrorMessage(node);

  for (var i = 1, n = tree.length; i < n; i++) {
    indent += '  ';
    output += indent + $tatic.formatErrorNodeTitle(tree[i]);
  }

  return output + ':' + colors.red(reason);
});

define.override($tatic, function getErrorMessage(node) {
  return node.error.toString();
});

define.override($tatic, function getErrorNodeTree(node) {
  var tree = [];
  while (node && node !== node._framework) {
    tree.unshift(node);
    node = climbTree(node);
  }
  return tree;
});

function climbTree(node) {
  switch (node.type) {
    case 'before':
    case 'after': {
      return node.node;
    }
    case 'beforeEach':
    case 'afterEach': {
      return node.node._parent;
    }
    default: {
      return node._parent;
    }
  }
}
