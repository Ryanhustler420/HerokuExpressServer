const {authenticationCheck} = require('./functions');
module.exports = (req, res, next) => authenticationCheck(req, res, next);