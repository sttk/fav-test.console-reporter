'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');
var unique = require('@fav/text.unique');

var majorVersion = Number(process.version.split('.')[0]);
var minorVersion = Number(process.version.split('.')[1]);

var exec;
if (majorVersion > 0 || minorVersion > 11 || os.platform() !== 'win32') {
  exec = childProcess.exec;
} else {
  exec = function(command, callback) {
    var tmpDir = path.resolve(__dirname, '../temp');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }
    var tmpStdoutPath = path.resolve(tmpDir, process.pid + '_' + unique());
    var tmpStderrPath = path.resolve(tmpDir, process.pid + '_' + unique());
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

module.exports = exec;


