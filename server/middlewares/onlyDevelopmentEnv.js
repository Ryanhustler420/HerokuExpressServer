const {onlyDevelopmentEnv} = require('./functions');
module.exports = (req, res, next) => onlyDevelopmentEnv(req, res, next);