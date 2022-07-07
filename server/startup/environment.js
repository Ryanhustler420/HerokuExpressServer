const _ = require('lodash');

function notFound(value, key) {
  if (_.isUndefined(value)) throw new Error(`FATAL ERROR: ${key} not found!`);
}

// this file is responsible for letting user know which env variable not found!
module.exports = function () {
  notFound(process.env.jwtPrivateKeyForPasswordHashing, 'jwtPrivateKeyForPasswordHashing');
  notFound(process.env.saltIterator, 'saltIterator');

  notFound(process.env.TESTING, "TESTING");
  notFound(process.env.PRODUCTION, "PRODUCTION");
  notFound(process.env.DEVELOPMENT, "DEVELOPMENT");

  notFound(process.env.INLINE_RUNTIME_CHUNK, "INLINE_RUNTIME_CHUNK");

  notFound(process.env.COMPANY_NAME, "COMPANY_NAME");
  notFound(process.env.MAILGUN_TLD_LIVE, "MAILGUN_TLD_LIVE");
  notFound(process.env.MAILGUN_TLD_SANDBOX, "MAILGUN_TLD_SANDBOX");
  notFound(process.env.MAILGUN_API_KEY, "MAILGUN_API_KEY");

  notFound(process.env.MAINTENANCE, "MAINTENANCE");
  notFound(process.env.MAINTENANCE_PASSWORD, "MAINTENANCE_PASSWORD");
  notFound(process.env.ADS_CONFIG_PASSWORD, "ADS_CONFIG_PASSWORD");
  notFound(process.env.ICS_CONFIG_PASSWORD, "ICS_CONFIG_PASSWORD");
};
