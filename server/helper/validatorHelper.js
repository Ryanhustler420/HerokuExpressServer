const _ = require('lodash');
const bcrypt = require('bcryptjs');
const {actorsNames} = require('../models/User');
const {mongoose} = require('../connections/database');
const ROLE = require('../static data/supported_roles');
const RESPONSE = require('../classes/RESPONSER');
const Utils = require('./utils');

const not = o => !o;

// [Tested] [Indirectly]
function hasRole(user, value) {
  if (_.isUndefined(value) || _.isNull(value)) return false;
  if (_.isUndefined(user) || _.isUndefined(user.roles)) return false;
  var found = _.indexOf(user.roles, value);
  return found != -1;
}

// [Tested] [Indirectly]
function valuesHasNoError(params = [], cb) {
  let fine = 0;
  let totalParams = params.length;
  for (let i = 0; i < totalParams; i++)
    notUndefinedAndNull(params[i], () => (fine += 1));
  const result = fine !== totalParams - 1;
  return result ? cb() : false;
}

// [Tested] [Indirectly]
function notUndefinedAndNullAndEmptyPromise(param) {
  return new Promise(resolve => !_.isUndefined(param) && !_.isNull(param) && !_.isEmpty(param) ? resolve(true) : resolve(false));
}

// [Tested] [Indirectly]
function notUndefinedAndNullPromise(param) {
  return new Promise(resolve => !_.isUndefined(param) && !_.isNull(param) ? resolve(true) : resolve(false));
}

// [Tested] [Indirectly]
function notUndefinedAndNull(param, cb) {
  return !_.isUndefined(param) && !_.isNull(param) ? cb() : false;
}

// [Tested] [Indirectly]
function isUserHasManagementRole(user) {
  return notUndefinedAndNull(user, () => hasRole(user, ROLE.MANAGEMENT));
}

// [Tested] [Indirectly]
function everyElementShouldBeValidRole(array) {
  return notUndefinedAndNull(array, () => {
    if (not(Array.isArray(array))) return false;

    const bools = _.map(array, (v) => _.includes(_.values(ROLE), v));
    if (bools.length == 0) return false;

    const isCorrect = _.includes(bools, false);
    return !isCorrect;
  });
}

// [Not Tested]
function parseEveryElementShouldBeValidRole(array) {
  return notUndefinedAndNull(array, () => {
    if (not(Array.isArray(array))) return false;

    const bools = _.map(array, (v) => parseInt(v) !== NaN && _.includes(_.values(ROLE), parseInt(v)));
    if (bools.length == 0) return false;

    const isCorrect = _.includes(bools, false);
    return !isCorrect;
  });
}

// [Tested] [Indirectly]
function elementShouldBeValidActor(actor) {
  return notUndefinedAndNull(actor, () =>
    _.includes(_.values(actorsNames), actor)
  );
}

// [Not Tested]
function parseElementShouldBeValidActor(actor) {
  return notUndefinedAndNull(actor, () => parseInt(actor) !== NaN && _.includes(_.values(actorsNames), parseInt(actor)));
}

// [Tested]
function everyElementShouldBeMongoId(array) {
  return notUndefinedAndNull(array, () => {
    if (not(Array.isArray(array))) return false;

    const bools = _.map(array, mongoose.Types.ObjectId.isValid);
    if (bools.length == 0) return false;

    const isCorrect = _.includes(bools, false);
    return !isCorrect;
  });
}

// [Tested]
function everyElementShouldBeNumber(array) {
  return notUndefinedAndNull(array, () => {
    if (not(Array.isArray(array))) return false;

    const bools = _.map(array, (v) => typeof v == 'number');
    if (bools.length == 0) return false;

    const isCorrect = _.includes(bools, false);
    return !isCorrect;
  });
}

// [Not Tested]
function parseEveryElementAndShouldBeNumber(array) {
  return notUndefinedAndNull(array, () => {
    if (not(Array.isArray(array))) return false;

    const bools = _.map(array, (v) => parseInt(v) !== NaN);
    if (bools.length == 0) return false;

    const isCorrect = _.includes(bools, false);
    return !isCorrect;
  });
}

// [Tested]
function elementShouldBeNumber(value) {
  return notUndefinedAndNull(value, () => typeof value == 'number');
}

// [Tested]
function everyElementShouldBeString(array) {
  return notUndefinedAndNull(array, () => {
    if (not(Array.isArray(array))) return false;

    const bools = _.map(array, (v) => typeof v == 'string');
    if (bools.length == 0) return false;

    const isCorrect = _.includes(bools, false);
    return !isCorrect;
  });
}

// [Tested]
function stringLengthShouldBeMoreThenZero(value) {
  return notUndefinedAndNull(value, () => {
    if (typeof value != 'string') return false;
    return value.length > 0;
  });
}

// [Tested]
function stringLengthShouldBeMoreThen(value, than) {
  return valuesHasNoError([value, than], () => {
    if (typeof value != 'string') return false;
    return value.length > parseInt(than);
  });
}

// [Tested]
function stringLengthShouldBeLessThen(value, than) {
  return valuesHasNoError([value, than], () => {
    if (typeof value != 'string') return false;
    return value.length < parseInt(than);
  });
}

// [Tested] [Indirectly]
function compareBcryptPassword(rawPassword, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(rawPassword, hashedPassword, function (error, Matched) {
      if (error) resolve(error);
      else resolve(Matched);
    });
  });
}

// [Tested]
function everyElementShouldBeObject(array) {
  return notUndefinedAndNull(array, () => {
    if (not(Array.isArray(array))) return false;

    const bools = _.map(array, (v) => _.isObjectLike(v));
    if (bools.length == 0) return false;

    const isCorrect = _.includes(bools, false);
    return !isCorrect;
  });
}

// [Tested]
function isValidBarcode(barcode) {
  return notUndefinedAndNull(barcode, () => {
    if (_.isString(barcode) && parseInt(barcode) > 0) {
      if (barcode.length > 10 && barcode.length < 15) {
        const prefix = barcode.substr(0, 3);
        return (parseInt(prefix) === 890);
      } else return false;
    } else return false;
  });
}

async function notUN(fieldName, value, res) {
  let fine = await notUndefinedAndNullPromise(value);
  if (not(fine)) return new RESPONSE(res).bad(Utils.errBody(`Something is not right, '${fieldName}' has bog down`));
}

async function notUNE(fieldName, value, res) {
  let fine = await notUndefinedAndNullAndEmptyPromise(value);
  if (not(fine)) return new RESPONSE(res).bad(Utils.errBody(`Something is not right, '${fieldName}' has bog down`));
}

function isValidUrl(url = ''){
  // return /((ftp|https?):\/\/)?(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/.test(learnRegExp.arguments[0]);
  return /((ftp|https?):\/\/)?(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/.test(url);
}

module.exports = {
  elementShouldBeNumber,
  isUserHasManagementRole,
  elementShouldBeValidActor,
  everyElementShouldBeValidRole,
  stringLengthShouldBeMoreThenZero,
  stringLengthShouldBeMoreThen,
  stringLengthShouldBeLessThen,
  everyElementShouldBeMongoId,
  everyElementShouldBeNumber,
  everyElementShouldBeString,
  everyElementShouldBeObject,
  notUndefinedAndNullAndEmptyPromise,
  parseEveryElementAndShouldBeNumber,
  parseEveryElementShouldBeValidRole,
  parseElementShouldBeValidActor,
  notUndefinedAndNullPromise,
  compareBcryptPassword,
  notUndefinedAndNull,
  valuesHasNoError,
  isValidUrl,
  notUNE,
  notUN,
  hasRole,
  isValidBarcode,
};
