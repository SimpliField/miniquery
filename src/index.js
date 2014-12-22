function miniquery(path, values) {
  var index = path.indexOf('.');
  var part = -1 !== index ? path.substring(0, index) : path;
  path = -1 !== index ? path.substring(index + 1) : '';
  values = values || [];

  values = values.reduce(function(values, value) {
    if((value instanceof Object) && '*' === part) {
      values = values.concat(Object.keys(value).map(function(key) {
        return value[key];
      }));
    }
    if((value instanceof Object) && '@' === part) {
      values = values.concat(Object.keys(value).filter(function(key) {
        return /^[^0-9]+$/.test(key);
      }).map(function(key) {
        return value[key];
      }));
    }
    if((value instanceof Array) && '#' === part) {
      values = values.concat(value);
    }
    if(-1 === ['@', '#', '*'].indexOf(part) &&
      'undefined' !== typeof value[part]) {
      values.push(value[part]);
    }
    return values;
  }, []).filter(function(value) {
    return 'undefined' !== typeof value;
  });
  return '' === path ? values : miniquery(path, values);
}

module.exports = miniquery;
