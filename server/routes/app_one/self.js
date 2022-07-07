const { mongo, connector } = require('../../connections/database');

const Utils = require('../../helper/utils');

class APP_ONE_SELF_LOGIC {

    async self_saveEvents() {
        await this.self_deleteEvents();

        const dataToSave = EventRegistry.getEnqueuedAsPlainObject() || [];

        const client = await mongo;
        const db = client.db(connector.databaseName);
        await db.collection('collection_events').insertMany(dataToSave).catch(Utils.dumpCatchedError);
    }

    async self_restoreEvents() {
        const client = await mongo;
        const db = client.db(connector.databaseName);
        const data = await db.collection('collection_events').find({}).toArray();
        EventRegistry.clear();
        for (let index = 0; index < data.length; index++) {
            EventRegistry.enqueue(data[index]);
        }
        EventRegistry.coroutine(DEFAULT_COROUTINE_DELAY_MS);
        console.log(data.length + 'events loaded from db...');
    }

    async self_deleteEvents() {
        const client = await mongo;
        const db = client.db(connector.databaseName);
        await db.collection('collection_events').deleteMany({});
    }

    async self_getEvents() {
        return EventRegistry.getEnqueuedAsPlainObject() || [];
    }

}

module.exports = APP_ONE_SELF_LOGIC;