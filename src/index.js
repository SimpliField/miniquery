function miniquery(path, objs) {
  var index = -1;
  var part = '';
  if('string' !== typeof path) {
    throw Error('`path` must be a string');
  }
  index = path.indexOf('.');
  part = -1 !== index ? path.substring(0, index) : path;
  path = -1 !== index ? path.substring(index + 1) : '';

  if(!(objs instanceof Array)) {
    throw Error('`objs` must be an instanceof `Array`');
  }

  objs = objs.reduce(function(objs, value) {
    if((value instanceof Object) && '*' === part) {
      objs = objs.concat(Object.keys(value).map(function(key) {
        return value[key];
      }));
    }
    if((value instanceof Object) && '@' === part) {
      objs = objs.concat(Object.keys(value).filter(function(key) {
        return /^[^0-9]+$/.test(key);
      }).map(function(key) {
        return value[key];
      }));
    }
    if((value instanceof Array) && '#' === part) {
      objs = objs.concat(value);
    }
    if(-1 === ['@', '#', '*'].indexOf(part) &&
      'undefined' !== typeof value[part]) {
      objs.push(value[part]);
    }
    return objs;
  }, []).filter(function(value) {
    return 'undefined' !== typeof value;
  });
  return '' === path ? objs : miniquery(path, objs);
}

module.exports = miniquery;
