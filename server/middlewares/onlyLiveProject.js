const {onlyLiveProject} = require('./functions');
module.exports = (req, res, next) => onlyLiveProject(req, res, next);