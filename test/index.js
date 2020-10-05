'use strict';

var fs = require('fs');
var os = require('os');
var path = require('path');
var assert = require('assert');

var colors = require('@fav/cli.text-style');
var startsWith = require('@fav/text.starts-with');

var exec = require('./tool/exec');
var diff = require('./tool/diff');

var testCliPath = path.resolve(__dirname, './tool/cli.js');
var fixturesDir = path.resolve(__dirname, './fixtures');
var expectedDir = path.resolve(__dirname, './expected');

fs.readdir(fixturesDir, function(err, fileNames) {
  if (err) {
    throw err;
  }
  fileNames.filter(isJsFile).map(addExpectedFile).forEach(runTestFile);
});

function isJsFile(testFileName) {
  return path.extname(testFileName) === '.js';
}

function addExpectedFile(testFileName) {
  var expectedBaseName = path.basename(testFileName, '.js');

  // Because error.toString() returns a different string by Node version.
  var versions = process.version.slice(1).split('.');
  var majorVersion = Number(versions[0]);
  switch (expectedBaseName) {
    case 'error-diff.test':
      if (majorVersion < 12) {
        expectedBaseName += '.lte11';
        break;
      }
    default:
      break;
  }

  return {
    fileName: testFileName,
    expected: expectedBaseName + '.txt',
  };
}

function runTestFile(test) {
  var filePath = path.resolve(fixturesDir, test.fileName);
  var expectedPath = path.resolve(expectedDir, test.expected);
  fs.readFile(expectedPath, 'utf8', function(err, executedOutput) {
    var arr = ['node', testCliPath, filePath, '--no-color'];
    if (startsWith(test.fileName, 'delay')) {
      arr.push('--delay');
    }
    exec(arr.join(' '), function(_, stdout) {
      outputTestResult(test.fileName, stdout, executedOutput);
    });
  });
}

var errorLogs = [];
process.on('exit', function() {
  if (errorLogs.length) {
    console.log(errorLogs.join('\n'));
    process.exit(1);
  }
});

function outputTestResult(testFileName, stdout, expected) {
  expected = expected.replace(new RegExp(os.EOL, 'g'), '\n');
  stdout = '\n' + stdout;

  var resultOutput = eraseElapsedTime(stdout);
  var expectedOutput = eraseElapsedTime(expected);

  try {
    assert.equal(resultOutput, expectedOutput);
    console.log(colors.green('✓'), testFileName);

  } catch (e) {
    var omitErrorStackRe = /\n  *at [^\n]*/g;
    var resultOutput2 = resultOutput.replace(omitErrorStackRe, '').trim();
    var expectedOutput2 = expectedOutput.replace(omitErrorStackRe, '').trim();

    try {
      assert.equal(resultOutput2, expectedOutput2);
      console.log(colors.yellow('✓'), testFileName, '(ignore error stack)');

    } catch (e2) {
      console.log(colors.red('×'), testFileName);
      errorLogs.push('---[' + testFileName + ']---');
      errorLogs.push(stdout);
      errorLogs.push('----------------------------');
      errorLogs.push(diff(resultOutput, expectedOutput));
      errorLogs.push('----------------------------');
      throw e;
    }
  }
}

function eraseElapsedTime(text) {
  return (text + '\n')
    .replace(/\([0-9.]+(ms|s|m|h)\)\n/g, '(?)\n')
    .slice(0, -1);
}

