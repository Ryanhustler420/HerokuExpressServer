const _ = require('lodash');

// [Tested]
exports.removeDoubleQuote = (string) => {
  if (typeof string != 'string') return '';
  if (_.isUndefined(string) || _.isNull(string)) return '';
  return string.replace(/"/g, '');
};

// [Tested]
exports.errBody = (errMessage) => {
  if (typeof errMessage != 'string') return {message: 'Something went wrong', error: true};
  return {message: errMessage || 'Something went wrong', error: true};
};

// [Tested]
exports.errBodyWithStack = (errMessage, stack) => {
  if (typeof errMessage != 'string') return {message: 'Something went wrong', error: true};
  return {message: errMessage || 'Something went wrong', stack, error: true};
};

exports.dumpCatchedError = (err) => {
  if (process.env.NODE_ENV !== process.env.TESTING) console.log('dumpCatchedError() ----->', err);
}