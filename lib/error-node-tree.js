'use strict';

var $tatic = require('./static');
var define = require('@fav/prop.define');
var override = define.override;
var repeat = require('@fav/text.repeat');

override($tatic, function writeErrorTrace(reporter, node, index) {
  var tree = getNodeTree(node);

  var errNo = (index + 1) + ') ';
  var indent = $tatic.indent();
  var sep = '\n' + indent + repeat(' ', errNo.length);

  var s = indent + errNo + $tatic.getNodeTitle(tree[0]);
  for (var i = 1, n = tree.length; i < n; i++) {
    sep += '  ';
    s += sep + $tatic.getNodeTitle(tree[i]);
  }

  $tatic.write(s + ':');
});

function getNodeTree(node) {
  var tree = [];
  while (node && node !== node._framework) {
    tree.unshift(node);
    node = climbTree(node);
  }
  return tree;
}

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

