const {onlyForWindowsPlatform} = require('./functions');
module.exports = (req, res, next) => onlyForWindowsPlatform(req, res, next);