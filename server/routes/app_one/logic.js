const RESPONSE = require('../../classes/RESPONSER');

const SELF_LOGIC = require('./self');
const _func = new SELF_LOGIC();

class APP_ONE_LOGIC {

    async saveEvents(req, res) {
        await _func.self_saveEvents();
        return new RESPONSE(res).ok('Saved events to db');
    }

    async restoreEvents(req, res) {
        await _func.self_restoreEvents();
        return new RESPONSE(res).ok('Restored The Data');
    }

    async deleteEvents(req, res) {
        await _func.self_deleteEvents();
        return new RESPONSE(res).ok('Deleted all saved event from db');
    }

    async getEvents(req, res) {
        const events = await _func.self_getEvents();
        return new RESPONSE(res).ok({events})
    }

}

module.exports = APP_ONE_LOGIC;