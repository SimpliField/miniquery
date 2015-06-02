#! /usr/bin/env node

var program = require('commander');
var fs = require('fs');
var miniquery = require('../src');

program
  .usage('[options] <query> <file ...>')
  .version('1.1.0')
  .option('-v, --verbose', 'tell me everything!')
  .option('-j, --json', 'output JSON')
  .option('-p, --primitive', 'print primitives only')
  .parse(process.argv);


var query = program.args[0];
var pathes = program.args.slice(1);

// Query is required
if(!query) {
  console.error('No query given in argument!');
  process.exit(1);
}

// Default to stdin
if(!pathes.length) {
  pathes = ['/dev/stdin'];
}

program.verbose = true;
pathes.reduce(function(matches, filePath) {
  var content;
  var curMatches;
  program.verbose && console.log('[' + filePath + '] Parsing...');
  try {
    content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch(err) {
    console.error('[' + filePath + '] Couldn\'t access/parse the file...', err);
  }
  if(!content) {
    return matches;
  }
  curMatches = miniquery(query, [content]);
  program.verbose && console.log('[' + filePath + '] ' + (curMatches.length) +
    ' match ' + (curMatches.length > 1 ? 's' : '') + '.');
  return matches.concat(curMatches);
}, []).forEach(function(match) {
  if(program.primitive) {
    if(-1 !== ['number', 'string', 'boolean'].indexOf(typeof match)) {
      console.log(program.json ? JSON.stringify(match) : match);
    } else {
      program.verbose && console.log('Filtered a non primitive match:', match);
    }
  } else {
    console.log(program.json ? JSON.stringify(match) : match);
  }
});

