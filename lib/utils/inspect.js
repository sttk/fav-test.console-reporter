'use strict';

var isPlainObject = require('@fav/type.is-plain-object');
var isString = require('@fav/type.is-string');
var isArray = require('@fav/type.is-array');
var enumAllKeys = require('@fav/prop.enum-all-keys');

function inspect(value) {
  return hierarchy(value, '');
}

function hierarchy(value, indent, key) {
  if (key == null) {
    key = '';
  } else {
    key = '"' + key + '": ';
  }

  if (isPlainObject(value)) {
    var childKeys = enumAllKeys(value).sort();
    if (childKeys.length === 0) {
      return indent + key + '{}';
    }

    var ret0 = indent + key + '{\n';
    for (var i0 = 0, n0 = childKeys.length; i0 < n0; i0++) {
      ret0 += hierarchy(value[childKeys[i0]], indent + '  ', childKeys[i0]);
      ret0 += '\n';
    }
    ret0 += indent + '}';
    return ret0;
  }

  if (isArray(value)) {
    if (value.length === 0) {
      return indent + key + '[]';
    }

    var ret1 = indent + key + '[\n';
    for (var i1 = 0, n1 = value.length; i1 < n1; i1++) {
      ret1 += hierarchy(value[i1], indent + '  ');
      ret1 += '\n';
    }
    ret1 += indent + ']';
    return ret1;
  }

  if (isString(value)) {
    return indent + key + '"' + value + '"';
  }

  return indent + key + String(value);
}

module.exports = inspect;
