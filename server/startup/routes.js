const _ = require('lodash');
const Utils = require('../helper/utils');
const RESPONSE = require('../classes/RESPONSER');
const {
  PLATFORMS,
  APP_NAMES,
  collection___init__,
} = require('../models/_Constants');
const image_containers = { image_container_appname: 'appname' }

const { version } = require('../connections/express');
const { mongo, connector } = require('../connections/database');

const app_one_routes = require('../routes/app_one/routes');
// more routes...

const onlySandboxProject = require('../middlewares/onlySandboxProject');
const checkMaintenance = require('../middlewares/checkMaintenance');
const errorGrabber = require('../middlewares/errorGrabber');

const not = (o) => !o;

module.exports = function (app) {

  // ROUTE NAMING CONVENTION -> {r_version}/api/{actor_name}/{collection_name-> singular or plural}/{purpose}
  // what data sending and how usefull that information for client
  // what is receiving, how important that data is,

  // hooking current environment name on every route 'req' param
  app.use((req, res, next) => {
    req.projectType = connector.projectType;
    req.env = connector.ENV;
    next();
  });

  app.use(`${version}/api/app_one`, checkMaintenance, app_one_routes);
  // more routes for other...

  const commonResponse = 'Your message';
  // [Tested]
  // Helps to turn "on" the maintenance variable of the server
  // So that user can't intract with the server API anymore
  // We want to make this available for everyboady without any restriction
  // But it required a password which only "ADMIN" has.

  // NOTE: this route should not be invoked by any random user, that's why we have a password logic
  app.get(`${version}/api/block/:password`, async (req, res) => {
    if (req.params.password === process.env.MAINTENANCE_PASSWORD) {
      process.env.MAINTENANCE = true;
      return new RESPONSE(res).ok({ message: 'APIs ARE BLOCKED' })
    } else return new RESPONSE(res).forbidden(Utils.errBody(commonResponse));
  });

  // [Tested]
  // Helps to turn "off" the maintenance variable of the server
  // So that user can intract with the server API
  // We want to make this available for everyboady without any restriction
  // But it required a password which only "ADMIN" has.

  // NOTE: this route should not be invoked by any random user, that's why we have a password logic
  app.get(`${version}/api/unblock/:password`, async (req, res) => {
    if (req.params.password === process.env.MAINTENANCE_PASSWORD) {
      process.env.MAINTENANCE = false;
      return new RESPONSE(res).ok({ message: 'APIs ARE RUNNING' })
    } else return new RESPONSE(res).forbidden(Utils.errBody(commonResponse));
  });

  // [Tested]
  // Helps to change the config of adsConfig class, which has values which we send via
  // header to each request

  // NOTE: this route should not be invoked by any random user, that's why we have a password logic
  app.get(`${version}/ads/block/:platform/:appname/:password`, async (req, res) => {
    const { platform, appname, password } = _.pick(req.params, ['platform', 'appname', 'password']);
    if (not(_.values(PLATFORMS).includes(platform))) return new RESPONSE(res).forbidden(Utils.errBody(commonResponse));
    if (not(_.values(APP_NAMES).includes(appname))) return new RESPONSE(res).forbidden(Utils.errBody(commonResponse));
    if (password === process.env.ADS_CONFIG_PASSWORD) {
      AdsConfig.see(platform, appname, false);
      return new RESPONSE(res).ok({ message: 'ADs ARE BLOCKED' })
    } else return new RESPONSE(res).forbidden(Utils.errBody(commonResponse));
  });

  // [Tested]
  // Helps to change the config of adsConfig class, which has values which we send via
  // header to each request

  // NOTE: this route should not be invoked by any random user, that's why we have a password logic
  app.get(`${version}/ads/unblock/:platform/:appname/:password`, async (req, res) => {
    const { platform, appname, password } = _.pick(req.params, ['platform', 'appname', 'password']);
    if (not(_.values(PLATFORMS).includes(platform))) return new RESPONSE(res).forbidden(Utils.errBody(commonResponse));
    if (not(_.values(APP_NAMES).includes(appname))) return new RESPONSE(res).forbidden(Utils.errBody(commonResponse));
    if (password === process.env.ADS_CONFIG_PASSWORD) {
      AdsConfig.see(platform, appname, true);
      return new RESPONSE(res).ok({ message: 'ADs ARE RUNNING' })
    } else return new RESPONSE(res).forbidden(Utils.errBody(commonResponse));
  });

  // [Not Tested]
  // Helps to change the config of icsConfig class, which has values which we send via
  // header to each request

  // NOTE: this route should not be invoked by any random user, that's why we have a password logic
  app.get(`${version}/ic_config/change/:platform/:appname/:image_container/:password`, async (req, res) => {
    const { platform, appname, image_container, password } = _.pick(req.params, ['platform', 'appname', 'image_container', 'password']);
    if (not(_.values(image_containers).includes(image_container))) return new RESPONSE(res).forbidden(Utils.errBody(commonResponse));
    if (not(_.values(PLATFORMS).includes(platform))) return new RESPONSE(res).forbidden(Utils.errBody(commonResponse));
    if (not(_.values(APP_NAMES).includes(appname))) return new RESPONSE(res).forbidden(Utils.errBody(commonResponse));
    if (password === process.env.ICS_CONFIG_PASSWORD) {
      ImageContainerConfig.methods.see(platform, appname, image_container);
      return new RESPONSE(res).ok({ message: `IC set to ${image_container}.` });
    } else return new RESPONSE(res).forbidden(Utils.errBody(commonResponse));
  });

  // default home route
  app.get(`${version}/`, checkMaintenance, (req, res) => {
    return new RESPONSE(res).ok({
      env: req.env,
      greeting: true,
      askForCoffee: false,
      message: 'Welcome to appname api',
      maintenance: process.env.MAINTENANCE
    });
  });

  // [Tested]
  // it's free from maintenance, so that we can test the route
  // is it fetching anything from database, usefull for testing 
  // when updaing the atlas tier or checking the db connection in general
  app.get(`${version}/__init__`, async (req, res) => {
    const client = await mongo;
    const db = client.db(connector.databaseName);
    const __init__ = await db.collection(collection___init__).findOne({});
    return new RESPONSE(res).ok(__init__);
  });

  app.post(`${version}/__init__`, async (req, res) => {
    console.log(req.body)
    return new RESPONSE(res).ok(req.body);
  });

  app.use(errorGrabber); // catches all the error here, since we are using monkey patching
};
