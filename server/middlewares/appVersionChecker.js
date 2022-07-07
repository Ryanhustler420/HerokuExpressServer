const { appVersionChecker } = require('./functions');
module.exports = (req, res, next) => appVersionChecker(req, res, next);