const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { header_keys } = require('../models/_Constants');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const cors_config = {
    origin: "*" // all
}

// creating express app
const app = express();

// middlewares
app.use(cookieParser());
app.use(helmet());
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({limit: '50mb'}));
app.use(express.text())

app.use(express.static('images'));
app.use(express.static('styles'));
app.set('views', path.join(__dirname, '..', '..', 'views'));
app.use(favicon(path.join(__dirname, '..', '..', 'images', 'database.png')));
app.use(cors(cors_config));

const config = require('config'); // we load the data from the JSON files if needed
const morgan = require('morgan'); // use morgan to log request incoming at command line
// app.get('env'); // return the env, dev || prod
// console.log(config) // return the .json file from config folder

// only show the log when it is dev. don't turn this on while deploy on server i.e digital ocean
if (config.util.getEnv('NODE_ENV') === process.env.DEVELOPMENT) app.use(morgan(`:req[${header_keys.appname_route_caller_appname}]@v:req[${header_keys.appname_app_version}] -> (${config.get('projectType')}) :method :url :status :res[content-length] - :response-time ms`)); // 'tiny' || 'combined' (outputs the Apache style LOGs)
if (config.util.getEnv('NODE_ENV') === process.env.PRODUCTION) app.use(morgan(`:req[${header_keys.appname_route_caller_appname}]@v:req[${header_keys.appname_app_version}] -> (${config.get('projectType')}) :method :url :status :res[content-length] - :response-time ms`)); // 'tiny' || 'combined' (outputs the Apache style LOGs)
const version = config.get('meta.routeVersion');

module.exports = { app, express, version }