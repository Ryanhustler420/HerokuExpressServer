const {corsCheck} = require('./functions');
module.exports = (req, res, next) => corsCheck(req, res, next);