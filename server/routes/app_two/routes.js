const _ = require('lodash');
const { check } = require('express-validator');

const { APP_NAMES, GENDERS, middleware_strictness } = require('../../models/_Constants');

const image_containers = {
    image_container_appname: 'appname'
}

// middlewares
const validateRequestBody = require('../../middlewares/validateBody');
const serverVersionChecker = require('../../middlewares/serverVersionChecker');
const appVersionChecker = require('../../middlewares/appVersionChecker');
const onlyAppAllowed = require('../../middlewares/onlyAppAllowed');
const authenticated = require('../../middlewares/authentication');
const headerChecker = require('../../middlewares/headerChecker');
const corsCheck = require('../../middlewares/corsChecker');

const {
    elementShouldBeValidActor,
    everyElementShouldBeValidRole,
    everyElementShouldBeNumber,
    stringLengthShouldBeMoreThenZero,
    stringLengthShouldBeMoreThen,
} = require('../../helper/validatorHelper');

const { express } = require('../../connections/express');
const router = express.Router();

const APP_TWO_LOGIC = require('./logic');
const _func = new APP_TWO_LOGIC();

// [Tested]
// When user want to register as a new user,
// Same email can't register twice,
router.post(`/users/create`,
    corsCheck,
    [
        check('actor').isNumeric().custom(elementShouldBeValidActor),
        check('address').isString().custom(v => stringLengthShouldBeMoreThen(v, 8)),
        check('city').isString().custom(v => stringLengthShouldBeMoreThen(v, 1)),
        check('country').isString().custom(v => stringLengthShouldBeMoreThen(v, 1)),
        check('dob').isString().custom(v => stringLengthShouldBeMoreThen(v, 5)),
        check('email').isString().isEmail(),
        check('gender').isString().custom(v => _.includes(_.values(GENDERS), v)),
        check('imageUrl').isString().custom(stringLengthShouldBeMoreThenZero),
        check('name').isString().custom(v => stringLengthShouldBeMoreThen(v, 5)),
        check('phone').isString().custom(v => stringLengthShouldBeMoreThen(v, 5)),
        check('roles').isArray().custom(v => v.length > 0).custom(everyElementShouldBeNumber).custom(everyElementShouldBeValidRole),
        check('state').isString().custom(v => stringLengthShouldBeMoreThen(v, 1)),
        check('password').isString().custom(v => stringLengthShouldBeMoreThen(v, 5)),
        check('deviceName').isString().custom(stringLengthShouldBeMoreThenZero),
        check('deviceUUID').isString().custom(v => stringLengthShouldBeMoreThen(v, 10)),
        check('appName').isString().custom(v => v == APP_NAMES.END),
        check('imageContainer').isString().custom(v => _.includes(_.values(image_containers), v)),
    ], headerChecker, onlyAppAllowed([APP_NAMES.END]), validateRequestBody, serverVersionChecker(middleware_strictness.dont_allow), appVersionChecker(middleware_strictness.dont_allow), async (req, res) => {
        await _func.createNewUser(req, res);
    });

// [Tested]
// When user want to end the session of login and want to get kick out from the
// Application will use this route
router.post(`/user/logout`,
    corsCheck,
    [
        check('deviceUUID').isString().custom(v => stringLengthShouldBeMoreThen(v, 10))
    ], headerChecker, onlyAppAllowed([APP_NAMES.END]), authenticated(middleware_strictness.dont_allow), validateRequestBody, serverVersionChecker(middleware_strictness.dont_allow), appVersionChecker(middleware_strictness.dont_allow), async (req, res) => {
        await _func.logoutUser(req, res);
    });


module.exports = router;
