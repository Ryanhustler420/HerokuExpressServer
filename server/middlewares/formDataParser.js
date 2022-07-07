const {formDataParser} = require('./functions');
module.exports = (req, res, next) => formDataParser(req, res, next);