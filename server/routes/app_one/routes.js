const { express } = require('../../connections/express');
const router = express.Router();

const APP_ONE_LOGIC = require('./logic');
const _func = new APP_ONE_LOGIC();

const corsCheck = require('../../middlewares/corsChecker');

router.get(`/app`, corsCheck, async (req, res) => res.send({message: "success"}));

// [Not Tested]
// Saves all the events present in EventRegistry which keep tracks of all the request in
// so that we can perform some operation in interval, using corouting
router.get(`/app_one/save-events`, corsCheck, async (req, res) => await _func.saveEvents(req, res));

// [Not Tested]
// Fetch all the saved envents from db and enqueue all of them so that we start from where we left,
// This will allow us to never stay empty, we did this because enqueue data is in memory and we will lose those
// Data if we' restart the server, [like push or restart, when server connects to the db, this function runs so that we populate the]
// registry once again not from scratch...
router.get(`/restore-events`, corsCheck, async (req, res) => await _func.restoreEvents(req, res));

// [Not Tested]
// Helps us to remove all the saved events from db, Just in case if we need this route in future
router.get(`/delete-events`, corsCheck, async (req, res) => await _func.deleteEvents(req, res));

// [Not Tested]
// Helps us to know how many events are currenly in event bus
router.get(`/all-events`, corsCheck, async (req, res) => await _func.getEvents(req, res));

module.exports = router;