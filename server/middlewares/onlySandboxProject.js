const {onlySandboxProject} = require('./functions');
module.exports = (req, res, next) => onlySandboxProject(req, res, next);