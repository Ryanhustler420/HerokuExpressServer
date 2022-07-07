const { userIdEquals } = require('./functions');
module.exports = (req, res, next) => userIdEquals(req, res, next);