const _ = require('lodash');
const chai = require('chai');
const server = require('../app');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const URL = require('./urls');
const CHECK = require('../classes/CHECK');
const ROLE = require('../static data/supported_roles');

const { mongoose } = require('../connections/database');
const image_containers = {
    image_container_appname: 'appname'
}

/** MODEL IMPORTS */
const { User, user, actorsNames, SIGNED_IN_METHODS } = require('../models/User');
const { country, countries } = require('../static data/supported_countries');
const { secretKeys } = require('../static data/secret_keys');

const { GENDERS, APP_NAMES, PLATFORMS, header_keys } = require('../models/_Constants');
const {
    noErrorOk,
    errorBadReq,
    bodyHasError,
    errorForbidden,
    bodyHasMessage,
    bodyHasDocument,
    bodyHasDocuments,
    errorUnauthorized,
    documentIsAnArray,
    errorUnProcessable,
    documentsIsAnArray,
    errorServiceUnavailable,
} = require('../classes/TestHelperMethods');

const { compareBcryptPassword } = require('../helper/validatorHelper');
const { versions: APP_VERSIONS } = require('../helper/versions');

const { N_REASON } = require('../models/Notification');

// Config chai
chai.use(chaiHttp);
chai.should();

const not = o => !o;
const agent = chai.request.agent(server); // for cookies and header hooking...

// SOME RESOURCES
// https://stackoverflow.com/questions/16633246/code-coverage-with-mocha

// NOTE:-
// Here every test cases are placed in sequce so don't mess with that... one test up or down might result test case!!!
// Sequency, [differenciate this routes a little because we have more actors in APPNAME eco system]

/**
 * NOTE:
 *  - server should not run ... close the server, while start testing these function,
 *  - By the way you cannot run multiple server, but you can have multiple clients,
 *  - Please check mongoDB file before running test case, be carefull because you might mess up with Production Database,
 */

// and then check with `npm start test`

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV != process.env.TESTING) throw new Error("The env is not testing");
// return; // manully comment this to test this file

before((done) => mongoose.connection.dropDatabase().then(() => done()));
beforeEach((done) => done());

const serverVersion = 1;

let headerAccessPlatformArray = 'access_platform_names_array';
let headerAppName = 'route_caller_appname';
let headerAppVersion = 'app_version';
let headerServerVersion = 'server_version';

const envRouteCommonHeaders = { [headerAccessPlatformArray]: [PLATFORMS.WINDOWS, PLATFORMS.DESKTOP], [headerAppName]: APP_NAMES.CONTRIBUTOR, [headerAppVersion]: APP_VERSIONS.android_env.latest, [headerServerVersion]: serverVersion }
const endRouteCommonHeaders = { [headerAccessPlatformArray]: [PLATFORMS.WINDOWS, PLATFORMS.DESKTOP], [headerAppName]: APP_NAMES.END, [headerAppVersion]: APP_VERSIONS.android_env.latest, [headerServerVersion]: serverVersion }
const spclRouteCommonHeaders = { [headerAccessPlatformArray]: [PLATFORMS.WINDOWS, PLATFORMS.DESKTOP], [headerAppName]: APP_NAMES.ADMIN, [headerAppVersion]: APP_VERSIONS.android_admin.latest, [headerServerVersion]: serverVersion }
const shopRouteCommonHeaders = { [headerAccessPlatformArray]: [PLATFORMS.WINDOWS, PLATFORMS.DESKTOP], [headerAppName]: APP_NAMES.SHOP, [headerAppVersion]: APP_VERSIONS.android_shop.latest, [headerServerVersion]: serverVersion }
const employeeRouteCommonHeaders = { [headerAccessPlatformArray]: [PLATFORMS.WINDOWS, PLATFORMS.DESKTOP], [headerAppName]: APP_NAMES.EMPLOYEE, [headerAppVersion]: APP_VERSIONS.android_employee.latest, [headerServerVersion]: serverVersion }

// Any app can access these routes
const helperRouteCommonHeaders = { [headerAccessPlatformArray]: [PLATFORMS.WINDOWS, PLATFORMS.DESKTOP], [headerAppName]: APP_NAMES.CONTRIBUTOR, [headerAppVersion]: APP_VERSIONS.android_env.latest, [headerServerVersion]: serverVersion }
const commonRouteCommonHeaders = { [headerAccessPlatformArray]: [PLATFORMS.WINDOWS, PLATFORMS.DESKTOP], [headerAppName]: APP_NAMES.CONTRIBUTOR, [headerAppVersion]: APP_VERSIONS.android_env.latest, [headerServerVersion]: serverVersion }

const FAKE_MONGO_ID = '61222cde73bc570c1823b0b8';
const FAKE_MISS_TYPE_MONGO_ID = '61222cde73bc570c1823b0b';

let userCount = 0;
let repoCount = 0;
let repoProdCount = 0;
let shopCount = 0;

const commonPool = {
    categories: [],
    siUnits: [],
};

const employeeState = {
    first_user: {
        raw: {
            username: "gaurav980@#",
            password: "123456789",
            name: "Gaurav Gupta",
            gender: "Male"
        },
        mixed: null,
    }
}

const _watchVal = function (error, response, ...rest) {
    // console.log(response.header.ads);
    // console.log(response.body);
}

describe('INTEGRATION TESTING', () => {

    describe('Open Routes Testing', () => {

        describe('Server API Testing', () => {

        });

        describe('Ads API Testing', () => {

        });

        describe('Database Connection', () => {

        });

    });

    describe('Creating Constants', () => {

    });

    describe('Creating Indexes on Collections', () => {

        describe('should INDEXED collection users', (done) => {

            // agent.post(URL.POST_INDEXING_USERS).set(helperRouteCommonHeaders).end(async (error, response) => {
            //     _watchVal(error, response);
            //     noErrorOk(error, response);
            //     bodyHasMessage(response);
            //     done();
            // });

        });

    });

    describe('Behavior Testing', () => {

        describe('End Application', () => {

        });

        describe('Employee Application', () => {

        });

    });

});