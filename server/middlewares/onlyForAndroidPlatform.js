const {onlyForAndroidPlatform} = require('./functions');
module.exports = (req, res, next) => onlyForAndroidPlatform(req, res, next);