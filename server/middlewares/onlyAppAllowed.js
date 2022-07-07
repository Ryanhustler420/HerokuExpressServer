const {onlyAppsAllowed} = require('./functions');
module.exports = (req, res, next) => onlyAppsAllowed(req, res, next);