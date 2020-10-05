# [@fav/test.console-reporter][repo-url] [![NPM][npm-img]][npm-url] [![MIT License][mit-img]][mit-url] [![Build Status][travis-img]][travis-url] [![Coverage status][coverage-img]][coverage-url]

Output test result by @fav/test.framework to console.

> "fav" is an abbreviation of "favorite" and also the acronym of "for all versions".
> This package is intended to support all Node.js versions and many browsers as possible.
> At least, this package supports Node.js >= v0.10 and major Web browsers: Chrome, Firefox, IE11, Edge, Vivaldi and Safari.


## Install

To install from npm:

```sh
$ npm install --save @fav/test.console-reporter
```

***NOTE:*** *npm < 2.7.0 does not support scoped package, but old versions of Node.js support it. So when you use such older npm, you should download this package from [github.com][repo-url], and move it in `node_modules/@fav/test.console-reporter/` directory manually.*


## Usage

This package is only used on Node.js.

```js
var Framework = require('@fav/test.framework');
var ConsoleReporter = require('@fav/test.console-reporter');

var fw = new Framework(),
    describe = fw.suite,
    it = fw.test,
    before = fw.before,
    after = fw.after,
    beforeEach = fw.beforeEach,
    afterEach = fw.afterEach;

describe.skip = fw.skipSuite;
it.skip = fw.skipTest;
describe.only = fw.onlySuite;
it.only = fw.onlyTest;

new ConsoleReporter(framework);

... test description ...

fw.run(function() {
  process.on('exit', function() {
    fw.emit('result');
    if (reporter.errored.length > 0) {
      process.exit(1);
    }
  });
});
```


## Checked

### Node.js (11〜14)

| Platform  |   11   |   12   |   13   |   14   |
|:---------:|:------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|

### Node.js (4〜10)

| Platform  |   4    |   5    |   6    |   7    |   8    |   9    |   10   |
|:---------:|:------:|:------:|:------:|:------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|

### io.js (1〜3)

| Platform  |   1    |   2    |   3    |
|:---------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|

### Node.js (〜0.12)

| Platform  |  0.8   |  0.9   |  0.10  |  0.11  |  0.12  |
|:---------:|:------:|:------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|


## License

Copyright (C) 2019-2020 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE is this distribution for more details.

[repo-url]: https://github.com/sttk/fav-test.console-reporter/
[npm-img]: https://img.shields.io/badge/npm-v0.1.0-blue.svg
[npm-url]: https://www.npmjs.com/package/@fav/test.console-reporter
[mit-img]: https://img.shields.io/badge/license-MIT-green.svg
[mit-url]: https://opensource.org/licenses/MIT
[travis-img]: https://travis-ci.org/sttk/fav-test.console-reporter.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/fav-test.console-reporter
[coverage-img]: https://coveralls.io/repos/github/sttk/fav-test.console-reporter/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/sttk/fav-test.console-reporter?branch=master
