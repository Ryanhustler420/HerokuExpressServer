// This file is responsible for creating folder in the first place,
const fs = require('fs');
const mkdirp = require('mkdirp');

const not = o => !o;

module.exports = async function() {
  if (not(fs.existsSync('./uploads'))) await mkdirp('./uploads');
}