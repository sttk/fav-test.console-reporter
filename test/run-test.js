'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');
var semver = require('semver');
var unique = require('@fav/text.unique');

var exec;
if (semver.gte(process.version, '11.0.0') || os.platform() !== 'win32') {
  exec = childProcess.exec;
} else {
  exec = function(command, callback) {
    var tmpdir = path.resolve(__dirname, '../temp');
    if (!fs.existsSync(tmpdir)) {
      fs.mkdirSync(tmpdir);
    }
    var tmpStdoutPath = path.resolve(tmpdir, process.pid + '_' + unique());
    var tmpStderrPath = path.resolve(tmpdir, process.pid + '_' + unique());
    command += ' > ' + tmpStdoutPath + ' 2> ' + tmpStderrPath;
    return childProcess.exec(command, function(err) {
      var stdout = fs.readFileSync(tmpStdoutPath, 'utf8');
      var stderr = fs.readFileSync(tmpStderrPath, 'utf8');
      fs.unlinkSync(tmpStdoutPath);
      fs.unlinkSync(tmpStderrPath);
      return callback(err, stdout, stderr);
    });
  };
}

var assert = require('assert');
var colors = require('@fav/cli.text-style');
var startsWith = require('@fav/text.starts-with');
var diff = require('@fav/text.diff');

var testCliPath = path.resolve(__dirname, './tool/cli.js');
var fixturesDir = path.resolve(__dirname, './fixtures');
var expectedDir = path.resolve(__dirname, './expected');

fs.readdir(fixturesDir, function(err, testFileNames) {
  if (err) {
    throw err;
  }
  testFileNames.filter(isJsFile).map(addExpectedFile).forEach(runTestFile);
});


function isJsFile(testFileName) {
  return path.extname(testFileName) === '.js';
}

function addExpectedFile(testFileName) {
  return {
    fileName: testFileName,
    expected: path.basename(testFileName, '.js') + '.txt',
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
    exec(arr.join(' '), function (err, stdout) {
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
    resultOutput = resultOutput.replace(omitErrorStackRe, '').trim();
    expectedOutput = expectedOutput.replace(omitErrorStackRe, '').trim();
    try {
      assert.equal(resultOutput, expectedOutput);
      console.log(colors.yellow('✓'), testFileName, '(ignore error stack)');
    } catch (e) {
      console.log(colors.red('×'), testFileName);
      errorLogs.push('---[' + testFileName + ']---');
      errorLogs.push(stdout);
      errorLogs.push('----------------------------');
      diff.lines(stdout, expected).forEach(function(d) {
        errorLogs.push(
          '-' + d.lines.src.start + ',' + d.lines.src.end + ' ' +
          '+' + d.lines.dest.start + ',' + d.lines.dest.end
        );
        errorLogs.push('-' +
          stdout.slice(d.src.start, d.src.end).replace(/\n/g, '\\n'));
        errorLogs.push('+' +
          expected.slice(d.dest.start, d.dest.end).replace(/\n/g, '\\n'));
      });
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
