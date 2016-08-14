# miniquery

`miniquery` allows you to query objects for a given path and returns you an
 `Array` of values matching.

[![NPM version](https://badge.fury.io/js/miniquery.svg)](https://npmjs.org/package/miniquery) [![Build status](https://secure.travis-ci.org/SimpliField/miniquery.png)](https://travis-ci.org/SimpliField/miniquery) [![Dependency Status](https://david-dm.org/SimpliField/miniquery.png)](https://david-dm.org/SimpliField/miniquery) [![devDependency Status](https://david-dm.org/SimpliField/miniquery/dev-status.png)](https://david-dm.org/SimpliField/miniquery#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/SimpliField/miniquery/badge.svg?branch=master)](https://coveralls.io/r/SimpliField/miniquery?branch=master) [![Code Climate](https://codeclimate.com/github/SimpliField/miniquery.png)](https://codeclimate.com/github/SimpliField/miniquery)

## Installation

First install `miniquery` in you project:
```sh
npm install --save miniquery
```

## Getting started

Then, use it:

```js
var miniquery = require('miniquery');
var assert = require('assert');

var fruits = [{
  name: 'orange'
  count: 2,
  colors: ['orange']
}, {
	name: 'banana',
  count: 0,
  colors: ['yellow', 'white']
}, {
	name: 'kiwi',
  count: 8,
  colors: ['brown', 'green']
}];

var orangeColor = miniquery('0.colors.0', [fruits]);
assert.deepEqual(orangeColor, ['orange']);

var counts = miniquery('*.count', [fruits]);
assert.deepEqual(counts, [2, 0, 8]);

var colors = miniquery('colors.#', fruits);
assert.deepEqual(colors, ['orange', 'yellow', 'white', 'brown', 'green']);
```

Note that `miniquery` always returns an `Array` even if there is no or only one
 result.

## CLI usage

Install miniquery globally:
```sh
sudo npm install -g miniquery
```

Then, simply run your queries on one or more JSON files. Let's assume we want
 to list distinct keywords on all of our NodeJS projects :
```sh
miniquery "keywords.*" ~/projects/*/package.json -p | uniq
# minimatch
# gulp
# svg
# gulp
# gulp-plugin
# (...)
# github
# REST
# HTTP
# server
# web
#services
```

Get every available options by running:
```sh
miniquery -h

# Usage: miniquery [options] <query> <file ...>
#
# Options:
#
#   -h, --help       output usage information
#   -V, --version    output the version number
#   -v, --verbose    tell me everything!
#   -j, --json       output JSON
#   -p, --primitive  print primitives only
```

## API

### values:Array miniquery(path:String, objs:Array)
Return the `values` matching the given `path` for the objects contained in
 `objs`.

## Contribute

Feel free to submit us your improvements. To do so, you must accept to publish
 your code under the MIT license.

To start contributing, first run the following to setup the development
 environment:
```sh
git clone git@github.com:SimpliField/miniquery.git
cd miniquery
npm install
```

Then, run the tests:
```sh
npm test
```

## Stats
[![NPM](https://nodei.co/npm/miniquery.png?downloads=true&stars=true)](https://nodei.co/npm/miniquery/)
[![NPM](https://nodei.co/npm-dl/miniquery.png)](https://nodei.co/npm/miniquery/)

