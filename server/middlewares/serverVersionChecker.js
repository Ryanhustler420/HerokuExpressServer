const {serverVersionChecker} = require('./functions');
module.exports = (req, res, next) => serverVersionChecker(req, res, next);