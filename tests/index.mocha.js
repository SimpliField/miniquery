var assert = require('assert');
var miniquery = require('../src');

describe('miniquery', function () {

  it('should be a function', function() {
    assert(miniquery instanceof Function);
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
