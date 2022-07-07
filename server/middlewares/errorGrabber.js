const {winstonLogger} = require('./functions');
module.exports = (err, req, res, next) => winstonLogger(err, req, res, next);