const _ = require('lodash');

const RESPONSE = require('../../classes/RESPONSER');

// models
// Like user, school

const { notUN } = require('../../helper/validatorHelper');
const { SIGNED_IN_METHODS } = require('../../models/User');

const not = (o) => !o;

class APP_TWO_LOGIC {

    async createNewUser(req, res) {
        let { email, appName, deviceName, deviceUUID } = _.pick(req.body, ['appName', 'deviceUUID', 'deviceName', 'email']);
        _.unset(req.body, 'deviceUUID');
        _.unset(req.body, 'deviceName');
        _.assign(req.body, {
            signedInUserFrom: [{
                appName,
                deviceName,
                deviceUUID,
                loggedIn: false,
                loggedOutAt: new Date(),
            }],
            // method update here,
            signedInVia: {
                method: SIGNED_IN_METHODS.APPNAME,
                signupCompleted: true,
            },
        });

        // const user = await new EUser().saveUser(req.body);
        // if (not(user)) return new RESPONSE(res).forbidden(EUser.userNotSavedMessageErr(email));

        // await new WCounter().increaseUserCount(req.body.country);
        return new RESPONSE(res).ok({ message: 'User has been register.', document: { user : null } });
    }

    async logoutUser(req, res) {
        return new RESPONSE(res).ok({ message: 'user has been logged out' });
    }

}

module.exports = APP_TWO_LOGIC;
