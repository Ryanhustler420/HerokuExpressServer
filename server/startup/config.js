const config = require('config');
const not = o => !o;

module.exports = function () {
  if (not(config.get('url'))) { throw new Error('FATAL ERROR: \'url\' not defined.'); }
};