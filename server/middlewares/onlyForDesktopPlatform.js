const {onlyForDesktopPlatform} = require('./functions');
module.exports = (req, res, next) => onlyForDesktopPlatform(req, res, next);
