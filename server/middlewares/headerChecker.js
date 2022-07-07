const {headerChecker} = require('./functions');
module.exports = (req, res, next) => headerChecker(req, res, next);