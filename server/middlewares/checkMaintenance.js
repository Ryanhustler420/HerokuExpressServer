const {maintenanceStateCheck} = require('./functions');
module.exports = (req, res, next) => maintenanceStateCheck(req, res, next);