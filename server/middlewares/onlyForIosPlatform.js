const {onlyForIosPlatform} = require('./functions');
module.exports = (req, res, next) => onlyForIosPlatform(req, res, next);