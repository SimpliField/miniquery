var assert = require('assert');
var miniquery = require('../src/index');

describe('miniquery', function () {

  it('should be a function', function() {
    assert(miniquery instanceof Function);
  });

  it('should fail with a bad objs value', function() {
    assert.throws(function() {
      miniquery('dd', {});
    });
  });

  it('should fail with a bad path value', function() {
    assert.throws(function() {
      miniquery({}, []);
    });
  });

  it('should work with simple property addressing', function() {
    var tree = [{
      foo: {
        bar: 'test'
      },
      bar: {
        bar: 'test2'
      }
    }];

    assert.deepEqual(
      miniquery('foo.bar', tree),
      ['test']
    );
  });

  it('should work with any property addressing', function() {
    var tree = [{
      foo: {
        bar: 'test'
      },
      bar: {
        bar: 'test2'
      }
    }];

    assert.deepEqual(
      miniquery('@.bar', tree),
      ['test', 'test2']
    );
  });

  it('should work with README samples', function() {
    var fruits = [{
      name: 'orange',
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
  });

});
