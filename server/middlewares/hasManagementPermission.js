const {hasManagementPermission} = require('./functions');
module.exports = (req, res, next) => hasManagementPermission(req, res, next);