const STREAM_OPERATIONS = {
    drop: 'drop',
    insert: 'insert',
    update: 'update',
    delete: 'delete',
    replace: 'replace',
    invalidate: 'invalidate',
    dropDatabase: 'dropDatabase',
}

const streams = function ({ mongo, connector }) {

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    async function usersCollectionChanges() {
        console.log('STARTED THE USERS COLLECTION STREAM...');
        const client = await mongo;
        const db = client.db(connector.databaseName);

        // Aggrigation.
        // const pipeline = [
        //   { $match: { 'fullDocument.email': ObjectId('61232c20fe2e4800167014f1') } },
        //   { $addFields: { newField: 'XXXXXXXXX' } }
        // ];

        const usersWatcher = db.collection('users').watch();
        usersWatcher.on('change', next => {
            let changes = {}
            switch (next.operationType) {
                // If done programatically then this case will trigger
                case STREAM_OPERATIONS.update:
                    changes = {
                        operation: next.operationType,
                        db: next.ns.db,
                        collection: next.ns.coll,
                        document_id: next.documentKey._id,
                        updatedFields: { ...next.updateDescription.updatedFields },
                        removedFields: { ...next.updateDescription.removedFields }
                    };
                    // console.log(changes);
                    // we can perform some operations like send notification if something has changes
                    // if user has placed an order then we'll send a message to the user as well,
                    // But file might become long later on, we have to seprate this shit
                    break;
                // If done manually from UI console then this case will trigger
                case STREAM_OPERATIONS.replace:
                    changes = {
                        operation: next.operationType,
                        db: next.ns.db,
                        collection: next.ns.coll,
                        document_id: next.documentKey._id,
                        freshDocument: { ...next.fullDocument },
                    };
                    // console.log(changes);
                    break;
                case STREAM_OPERATIONS.delete:
                case STREAM_OPERATIONS.insert:
                case STREAM_OPERATIONS.invalidate:
                    break;
                case STREAM_OPERATIONS.drop:
                    console.log('STOPPING THE USERS COLLECTION STREAM, SINCE COLLECTION DROPPED');
                    usersWatcher.close(); // close the old stream
                    usersCollectionChanges(); // rerun
                    break;
            }
        });

    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    async function databaseChanges() {
        console.log('STARTED THE OVERALL DATABSE STREAM...');
        const client = await mongo;
        const db = client.db(connector.databaseName);

        // Aggrigation.
        // const pipeline = [
        //   { $match: { 'fullDocument.email': ObjectId('61232c20fe2e4800167014f1') } },
        //   { $addFields: { newField: 'XXXXXXXXX' } }
        // ];

        const overall = db.watch();
        overall.on('change', next => {
            let changes = {}
            switch (next.operationType) {
                // If done programatically then this case will trigger
                case STREAM_OPERATIONS.update:
                    changes = {
                        operation: next.operationType,
                        db: next.ns.db,
                        collection: next.ns.coll,
                        document_id: next.documentKey._id,
                        updatedFields: { ...next.updateDescription.updatedFields },
                        removedFields: { ...next.updateDescription.removedFields }
                    };
                    // console.log(changes);
                    // we can perform some operations like send notification if something has changes
                    // if user has placed an order then we'll send a message to the user as well,
                    // But file might become long later on, we have to seprate this shit
                    break;
                // If done manually from UI console then this case will trigger
                case STREAM_OPERATIONS.replace:
                    changes = {
                        operation: next.operationType,
                        db: next.ns.db,
                        collection: next.ns.coll,
                        document_id: next.documentKey._id,
                        freshDocument: { ...next.fullDocument },
                    };
                    // console.log(changes);
                    break;
                case STREAM_OPERATIONS.drop:
                case STREAM_OPERATIONS.delete:
                case STREAM_OPERATIONS.insert:
                case STREAM_OPERATIONS.invalidate:
                    break;
                case STREAM_OPERATIONS.dropDatabase:
                    console.log('STOPPING THE OVERALL DATABASE STREAM, SINCE DATBASE DROPPED');
                    overall.close(); // close the old stream
                    databaseChanges(); // rerun
                    break;
            }
        });
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    databaseChanges();
    usersCollectionChanges();
}

module.exports = streams;