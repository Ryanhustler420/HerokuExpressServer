const {asyncMiddleware} = require('./functions');
module.exports = (handler) => asyncMiddleware(handler);