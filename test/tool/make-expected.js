'use strict';

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var fixturesDir = path.resolve(__dirname, '../fixtures');
var expectedDir = path.resolve(__dirname, '../expected');

process.chdir(path.resolve(__dirname, '../..'));

fs.readdir(fixturesDir, function(err, files) {
  if (err) {
    throw err;
  }
  files.forEach(function(file) {
    var expectedFile = path.basename(file, '.js') + '.txt';
    var expectedPath = path.resolve(expectedDir, expectedFile);
    if (fs.existsSync(expectedPath)) {
      return;
    }

    var testFilePath = path.resolve(fixturesDir, file);
    var opts = (file.slice(0, 5) === 'delay') ? '--delay' : '';

    exec([
      'npx',
      'mocha',
      opts,
      testFilePath,
      ' > ',
      expectedPath,
    ].join(' '));
  });
});

