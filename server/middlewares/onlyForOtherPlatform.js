const {onlyForOtherPlatform} = require('./functions');
module.exports = (req, res, next) => onlyForOtherPlatform(req, res, next);