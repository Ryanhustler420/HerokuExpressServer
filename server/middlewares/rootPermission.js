const {hasRootPermission} = require('./functions');
module.exports = (req, res, next) => hasRootPermission(req, res, next);