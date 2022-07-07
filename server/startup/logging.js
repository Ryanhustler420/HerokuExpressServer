const winston = require('winston');
const colors = require('colors');
const _ = require('lodash');

const not = o => !o;

colors.setTheme({
  pointOut: ['yellow', 'italic'], // <- check 'colors' source for hidden docs
  error: ['red', 'bold'],
});

// const {connector} = require('../connections/mongoDB');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
  // it will catch the thrown error
  winston.handleExceptions(
    new winston.transports.File({filename: 'uncaughtExceptions.log'})
  );

  // it will throw when occure 'unhandledRejection
  process.on('unhandledRejection', (ex) => {
    if (not(_.isUndefined(ex.stack))) console.log(ex.stack.pointOut);
    if (not(_.isUndefined(ex.message))) console.log(ex.message.error);
    throw ex;
  });

  winston.add(winston.transports.File, {filename: 'logfile.log'});
  // winston.add(winston.transports.MongoDB, {
  //   db: connector.databaseUrl,
  //   level: 'info',
  // });
};
