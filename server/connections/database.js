const {MongoClient, ObjectId} = require('mongodb'); // Plain Driver
const mongoose = require('mongoose'); // ORM

const winston = require('winston');
const config = require('config');

const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

// [PLEASE READ THIS]
// https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/
// https://stackoverflow.com/questions/38921414/mongodb-what-are-the-default-user-and-password

// 1st cmd ->> mongod --port 27020 --dbpath C:\MASTER\db --replSet rs1
// 2nd cmd ->> mongo --port 27020
// Open Robo3T connect on port 27020

// run this on cmd promt from tha persons.json file location
// mongoimport persons.json -d Development -c persons --jsonArray -> push the data to default port i.e 27017
// mongoimport persons.json --host localhost --port 27020 -d Development -c Persons --jsonArray --drop

// keep server up, Robo3T open, postman open, nodeJs server open

const connector = {
  db_port: config.get('db_port'),
  hostName: config.get('hostName'),
  user: config.get('user'),
  projectType: config.get('projectType'),
  databaseName: config.get('databaseName'),
  replicaSetName: config.get('replicaSetName'),
  databaseUrl: config.get('url'),
  mongoOptions: {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  meta: config.get('meta'),
};

if (process.env.NODE_ENV === process.env.TESTING) {
  connector.databaseName = 'Testing';
  connector.ENV = process.env.TESTING
}
if (process.env.NODE_ENV === process.env.DEVELOPMENT) {
  connector.databaseName = 'Development';
  connector.ENV = process.env.DEVELOPMENT;
}
if (process.env.NODE_ENV === process.env.PRODUCTION) {
  connector.databaseName = 'Production';
  connector.ENV = process.env.PRODUCTION;
}
if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = process.env.DEVELOPMENT;
  connector.ENV = process.env.NODE_ENV;
}

// connecting to mongo server...
const mongo = MongoClient.connect(connector.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;
mongoose.connect(connector.databaseUrl, connector.mongoOptions, () => winston.info(JSON.stringify(connector, null, 4)));

require('./streams')({mongo, mongoose, connector});
module.exports = { mongo, mongoose, connector, ObjectId };