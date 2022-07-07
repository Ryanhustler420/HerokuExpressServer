const {validateRequestBody} = require('./functions');
module.exports = (req, res, next) => validateRequestBody(req, res, next);