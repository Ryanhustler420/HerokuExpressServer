const Utils = require('../helper/utils');
const { expect } = require('chai');
const { country } = require('../static data/supported_countries');

const CHECK = require('../classes/CHECK');
const { APP_NAMES } = require('../models/_Constants');

// models imports

const { mongoose } = require('../connections/database');
const { actorsNames } = require('../models/User');

describe('UNIT TESTING', () => {

    describe('Utils Methods', () => {

        describe('errBodyWithStack(errorMessage::sttring, stack::object)', () => {

            const { errBodyWithStack } = require('../helper/utils');

            it('should return object containing message, error, stack property, while message has value same as passed argument', () => {
                const err = errBodyWithStack('Hello, "world"', { typeErr: 'dumping values' });
                expect(err).has.property('error').equal(true);
                expect(err).has.property('message').equal('Hello, "world"');
                expect(err).has.property('stack').has.property('typeErr').equal('dumping values');
            });

            it('should return object containing message, error, stack property, since empty string provided, message will be some other message', () => {
                const err = errBodyWithStack('', { typeErr: 'dumping values' });
                expect(err).has.property('error').equal(true);
                expect(err).has.property('message').equal('Something went wrong');
                expect(err).has.property('stack').has.property('typeErr').equal('dumping values');
            });

            it('should return object containing message, error property, since no args has provided, message will be some other message, no stack property will be there', () => {
                const err = errBodyWithStack();
                expect(err).not.has.property('stack');
                expect(err).has.property('error').equal(true);
                expect(err).has.property('message').equal('Something went wrong');
            });

        })

        describe('errBody(errorMessage::string)', () => {
            const { errBody } = require('../helper/utils');

            it('should return object containing message and error property, while message has value same as passed argument', () => {
                const err = errBody('Hello, "world"');
                expect(err).has.property('error').equal(true);
                expect(err).has.property('message').equal('Hello, "world"');
            });

            it('should return object containing message and error property, since empty string provided, message will be some other message', () => {
                const err = errBody('');
                expect(err).has.property('error').equal(true);
                expect(err).has.property('message').equal('Something went wrong');
            });

            it('should return object containing message and error property, since no args has provided, message will be some other message', () => {
                const err = errBody();
                expect(err).has.property('error').equal(true);
                expect(err).has.property('message').equal('Something went wrong');
            });

            it('should return object containing message and error property, since undefine has provided, message will be some other message', () => {
                const err = errBody(undefined);
                expect(err).has.property('error').equal(true);
                expect(err).has.property('message').equal('Something went wrong');
            });

            it('should return object containing message and error property, since null has provided, message will be some other message', () => {
                const err = errBody(null);
                expect(err).has.property('error').equal(true);
                expect(err).has.property('message').equal('Something went wrong');
            });

            it('should return object containing message and error property, since empty [] has provided, message will be some other message', () => {
                const err = errBody([]);
                expect(err).has.property('error').equal(true);
                expect(err).has.property('message').equal('Something went wrong');
            });

            it('should return object containing message and error property, since empty {} has provided, message will be some other message', () => {
                const err = errBody({});
                expect(err).has.property('error').equal(true);
                expect(err).has.property('message').equal('Something went wrong');
            });

            it('should return object containing message and error property, since numaric value has provided, message will be some other message', () => {
                const err = errBody(56);
                expect(err).has.property('error').equal(true);
                expect(err).has.property('message').equal('Something went wrong');
            });

        })

        describe('removeDoubleQuote(string)', () => {

            const { removeDoubleQuote } = require('../helper/utils');

            it('should replace double quutes around words of a string', () => {
                expect(removeDoubleQuote('Hello, "world"')).to.equal("Hello, world");
            });

            it('should return empty string if value is empty string', () => {
                expect(removeDoubleQuote('')).to.be.equal('');
            });

            it('should return empty string if no param has passed into function', () => {
                expect(removeDoubleQuote()).to.be.equal('');
            });

            it('should return empty string if value is undefined', () => {
                expect(removeDoubleQuote(undefined)).to.be.equal('');
            });

            it('should return empty string if value is null', () => {
                expect(removeDoubleQuote(null)).to.be.equal('');
            });

            it('should return empty string if value is [] instead of string', () => {
                expect(removeDoubleQuote([])).to.be.equal('');
            });

            it('should return empty string if value is {} instead of string', () => {
                expect(removeDoubleQuote({})).to.be.equal('');
            });

            it('should return empty string if value is numaric instead of string', () => {
                expect(removeDoubleQuote(56)).to.be.equal('');
            });

        });

    });

    describe('Validator Helper Methods', () => {

        describe('isValidBarcode(code::string)', () => {

            const { isValidBarcode } = require('../helper/validatorHelper');

            it('should return false if value is empty string', () => {
                expect(isValidBarcode('')).to.be.equal(false);
            });

            it('should return false if no param has passed into function', () => {
                expect(isValidBarcode()).to.be.equal(false);
            });

            it('should return false if value is undefined', () => {
                expect(isValidBarcode(undefined)).to.be.equal(false);
            });

            it('should return false if value is null', () => {
                expect(isValidBarcode(null)).to.be.equal(false);
            });

            it('should return false if value is [] instead of string', () => {
                expect(isValidBarcode([])).to.be.equal(false);
            });

            it('should return false if value is {} instead of string', () => {
                expect(isValidBarcode({})).to.be.equal(false);
            });

            it('should return false if value is numaric instead of string', () => {
                expect(isValidBarcode(56)).to.be.equal(false);
            });

            it('should return false if value is string but not parsable to long', () => {
                expect(isValidBarcode('abcdefghijhlkmnop')).to.be.equal(false);
            });

            it('should return false if value is string but has less length then required', () => {
                expect(isValidBarcode('123456')).to.be.equal(false);
            });

            it('should return false if value is string but not has valid barcode prefix', () => {
                expect(isValidBarcode('7501157045093')).to.be.equal(false);
            });

            it('should return true if value is string with valid lengh and valid prefix barcode number', () => {
                expect(isValidBarcode('8901157045093')).to.be.equal(true);
            });

        });

        describe('elementShouldBeNumber(value::int)', () => {

            const { elementShouldBeNumber } = require('../helper/validatorHelper');

            it('should return true if value is real number', () => {
                expect(elementShouldBeNumber(12)).to.be.equal(true);
            });

            it('should return true if value is float number', () => {
                expect(elementShouldBeNumber(45.66)).to.be.equal(true);
            });

            it('should return false if value is string', () => {
                expect(elementShouldBeNumber('12')).to.be.equal(false);
            });

            it('should return false if value is undefined', () => {
                expect(elementShouldBeNumber(undefined)).to.be.equal(false);
            });

            it('should return false if value is type []', () => {
                expect(elementShouldBeNumber([])).to.be.equal(false);
            });

            it('should return false if value is null', () => {
                expect(elementShouldBeNumber(null)).to.be.equal(false);
            });

        });

        describe('isUserHasManagementRole(user{...}::schema)', () => {

            const { isUserHasManagementRole } = require('../helper/validatorHelper');

            const userWithoutRoles = { name: 'Gaurav' }
            const userWithBlankRoles = { roles: [] }
            const userWithRolesAsObj = { roles: { 'a': 1, 'b': 5 } }
            const userWithInvalidRoles = { roles: [4, 5, 6] }
            const userWithStringTypeRoles = { roles: ['1', '0', '2'] }
            const userWithNumaricTypeRoles = { roles: [1, 2, 0] }
            const userWithStringTypeCharRoles = { roles: ['a', 'b', 'c'] }
            const userIsArrayInsteadOfObject = [];
            const userObjectHasNoKeysValues = {};
            const userIsUndefined = undefined;
            const userIsNull = null;

            it('should return false if user object has no roles property', () => {
                expect(isUserHasManagementRole(userWithoutRoles)).to.be.equal(false);
            });

            it('should return false if user object has blank roles [] property', () => {
                expect(isUserHasManagementRole(userWithBlankRoles)).to.be.equal(false);
            });

            it('should return false if user object has roles {} instead of []', () => {
                expect(isUserHasManagementRole(userWithRolesAsObj)).to.be.equal(false);
            });

            it('should return false if user object has invalid roles []', () => {
                expect(isUserHasManagementRole(userWithInvalidRoles)).to.be.equal(false);
            });

            it('should return false if user object has roles [] but has values as string inside instead of numaric value', () => {
                expect(isUserHasManagementRole(userWithStringTypeRoles)).to.be.equal(false);
            });

            it('should return true if user object has roles property with correct type and valid roles', () => {
                expect(isUserHasManagementRole(userWithNumaricTypeRoles)).to.be.equal(true);
            });

            it('should return false if user object has roles [] but has values as char inside instead of numaric value', () => {
                expect(isUserHasManagementRole(userWithStringTypeCharRoles)).to.be.equal(false);
            });

            it('should return false if user is [] instead if {}', () => {
                expect(isUserHasManagementRole(userIsArrayInsteadOfObject)).to.be.equal(false);
            });

            it('should return false if user object is empty', () => {
                expect(isUserHasManagementRole(userObjectHasNoKeysValues)).to.be.equal(false);
            });

            it('should return false if user is undefined', () => {
                expect(isUserHasManagementRole(userIsUndefined)).to.be.equal(false);
            });

            it('should return false if user is null', () => {
                expect(isUserHasManagementRole(userIsNull)).to.be.equal(false);
            });

        });

        describe('elementShouldBeValidActor(actor::int)', () => {

            const { elementShouldBeValidActor } = require('../helper/validatorHelper');

            it('should return false if value is empty string', () => {
                expect(elementShouldBeValidActor('')).to.be.equal(false);
            });

            it('should return false if no param has passed into function', () => {
                expect(elementShouldBeValidActor()).to.be.equal(false);
            });

            it('should return false if value is undefined', () => {
                expect(elementShouldBeValidActor(undefined)).to.be.equal(false);
            });

            it('should return false if value is null', () => {
                expect(elementShouldBeValidActor(null)).to.be.equal(false);
            });

            it('should return false if value is blank [] instead of numaric value', () => {
                expect(elementShouldBeValidActor([])).to.be.equal(false);
            });

            it('should return false if value is blank {} instead of numaric value', () => {
                expect(elementShouldBeValidActor({})).to.be.equal(false);
            });

            it('should return false if value is numaric but not a valid actor code', () => {
                expect(elementShouldBeValidActor(56)).to.be.equal(false);
            });

            it('should return true if value is numaric and valid actor code', () => {
                expect(elementShouldBeValidActor(actorsNames.End)).to.be.equal(true);
                expect(elementShouldBeValidActor(actorsNames.Shop)).to.be.equal(true);
                expect(elementShouldBeValidActor(actorsNames.Repository)).to.be.equal(true);
                expect(elementShouldBeValidActor(actorsNames.Admin)).to.be.equal(true);
            });

        });

        describe('everyElementShouldBeValidRole(el:[])', () => {

            const { everyElementShouldBeValidRole } = require('../helper/validatorHelper');

            it('should return false if value is empty string', () => {
                expect(everyElementShouldBeValidRole('')).to.be.equal(false);
            });

            it('should return false if no param has passed into function', () => {
                expect(everyElementShouldBeValidRole()).to.be.equal(false);
            });

            it('should return false if value is undefined', () => {
                expect(everyElementShouldBeValidRole(undefined)).to.be.equal(false);
            });

            it('should return false if value is null', () => {
                expect(everyElementShouldBeValidRole(null)).to.be.equal(false);
            });

            it('should return false if value is blank [] but has no values into it', () => {
                expect(everyElementShouldBeValidRole([])).to.be.equal(false);
            });

            it('should return false if value is blank {} instead of []', () => {
                expect(everyElementShouldBeValidRole({})).to.be.equal(false);
            });

            it('should return false if value is numaric instead of []', () => {
                expect(everyElementShouldBeValidRole(56)).to.be.equal(false);
            });

            it('should return false if value inside [] are invalid', () => {
                expect(everyElementShouldBeValidRole([56, 69])).to.be.equal(false);
            });

            it('should return true if value are numaric inside [] and that too valid once', () => {
                const { ROOT, NORMAL, MANAGEMENT } = require('../static data/supported_roles');
                expect(everyElementShouldBeValidRole([ROOT])).to.be.equal(true);
                expect(everyElementShouldBeValidRole([NORMAL])).to.be.equal(true);
                expect(everyElementShouldBeValidRole([MANAGEMENT])).to.be.equal(true);
            });

        });

        describe('stringLengthShouldBeMoreThenZero(value::string)', () => {

            const { stringLengthShouldBeMoreThenZero } = require('../helper/validatorHelper');

            it('should return false if value is empty string', () => {
                expect(stringLengthShouldBeMoreThenZero('')).to.be.equal(false);
            });

            it('should return false if no param has passed into function', () => {
                expect(stringLengthShouldBeMoreThenZero()).to.be.equal(false);
            });

            it('should return false if value is undefined', () => {
                expect(stringLengthShouldBeMoreThenZero(undefined)).to.be.equal(false);
            });

            it('should return false if value is null', () => {
                expect(stringLengthShouldBeMoreThenZero(null)).to.be.equal(false);
            });

            it('should return false if value is [] instead of string', () => {
                expect(stringLengthShouldBeMoreThenZero([])).to.be.equal(false);
            });

            it('should return false if value is {} instead of string', () => {
                expect(stringLengthShouldBeMoreThenZero({})).to.be.equal(false);
            });

            it('should return false if value is numaric instead of string', () => {
                expect(stringLengthShouldBeMoreThenZero(56)).to.be.equal(false);
            });

            it('should return true if value is string with length > 0', () => {
                expect(stringLengthShouldBeMoreThenZero('abc')).to.be.equal(true);
            });

        });

        describe('stringLengthShouldBeMoreThen(value::string, then::int)', () => {

            const { stringLengthShouldBeMoreThen } = require('../helper/validatorHelper');

            it('should return false if value is empty string', () => {
                expect(stringLengthShouldBeMoreThen('', '')).to.be.equal(false);
            });

            it('should return false if no param has passed into function', () => {
                expect(stringLengthShouldBeMoreThen()).to.be.equal(false);
            });

            it('should return false if value is undefined', () => {
                expect(stringLengthShouldBeMoreThen(undefined, undefined)).to.be.equal(false);
            });

            it('should return false if value is null', () => {
                expect(stringLengthShouldBeMoreThen(null, null)).to.be.equal(false);
            });

            it('should return false if value is undefine and null', () => {
                expect(stringLengthShouldBeMoreThen(undefined, null)).to.be.equal(false);
            });

            it('should return false if only one valid args passed', () => {
                expect(stringLengthShouldBeMoreThen('abc')).to.be.equal(false);
            });

            it('should return false if first param value is {} instead of string', () => {
                expect(stringLengthShouldBeMoreThen({}, 5)).to.be.equal(false);
            });

            it('should return false if value is numaric instead of string', () => {
                expect(stringLengthShouldBeMoreThen(56, 5)).to.be.equal(false);
            });

            it('should return true if value is string with length > 0', () => {
                expect(stringLengthShouldBeMoreThen('abc', 0)).to.be.equal(true);
            });

            it('should return true if value is string with length > 0', () => {
                expect(stringLengthShouldBeMoreThen('abc', 2)).to.be.equal(true);
            });

            it('should return false if value is string with length 3 and it should be greater then 6', () => {
                expect(stringLengthShouldBeMoreThen('abc', 6)).to.be.equal(false);
            });

        });

        describe('stringLengthShouldBeLessThen(value::string, then::int)', () => {

            const { stringLengthShouldBeLessThen } = require('../helper/validatorHelper');

            it('should return false if value is empty string', () => {
                expect(stringLengthShouldBeLessThen('', '')).to.be.equal(false);
            });

            it('should return false if no param has passed into function', () => {
                expect(stringLengthShouldBeLessThen()).to.be.equal(false);
            });

            it('should return false if value is undefined', () => {
                expect(stringLengthShouldBeLessThen(undefined, undefined)).to.be.equal(false);
            });

            it('should return false if value is null', () => {
                expect(stringLengthShouldBeLessThen(null, null)).to.be.equal(false);
            });

            it('should return false if value is undefine and null', () => {
                expect(stringLengthShouldBeLessThen(undefined, null)).to.be.equal(false);
            });

            it('should return false if only one valid args passed', () => {
                expect(stringLengthShouldBeLessThen('abc')).to.be.equal(false);
            });

            it('should return false if first param value is {} instead of string', () => {
                expect(stringLengthShouldBeLessThen({}, 5)).to.be.equal(false);
            });

            it('should return false if value is numaric instead of string', () => {
                expect(stringLengthShouldBeLessThen(56, 5)).to.be.equal(false);
            });

            it('should return true if value is string with length < 4', () => {
                expect(stringLengthShouldBeLessThen('abc', 4)).to.be.equal(true);
            });

            it('should return false if value is string with length 9 and it should be less then 6', () => {
                expect(stringLengthShouldBeLessThen('abcdefghi', 6)).to.be.equal(false);
            });

        });

        describe('everyElementShouldBeMongoId(array::[mongoId])', () => {

            const { everyElementShouldBeMongoId } = require('../helper/validatorHelper');

            it('should return false if value is empty string', () => {
                expect(everyElementShouldBeMongoId('')).to.be.equal(false);
            });

            it('should return false if no param has passed into function', () => {
                expect(everyElementShouldBeMongoId()).to.be.equal(false);
            });

            it('should return false if value is undefined', () => {
                expect(everyElementShouldBeMongoId(undefined)).to.be.equal(false);
            });

            it('should return false if value is null', () => {
                expect(everyElementShouldBeMongoId(null)).to.be.equal(false);
            });

            it('should return false if blank [] passed', () => {
                expect(everyElementShouldBeMongoId([])).to.be.equal(false);
            });

            it('should return false if value is {} instead of []', () => {
                expect(everyElementShouldBeMongoId({})).to.be.equal(false);
            });

            it('should return false if value is numaric instead of []', () => {
                expect(everyElementShouldBeMongoId(56)).to.be.equal(false);
            });

            it('should return false if values in [] is string but that string is not mongoId', () => {
                expect(everyElementShouldBeMongoId(['not', 'mongoId', 'should', 'get', 'anError'])).to.be.equal(false);
            });

            it('should return false if values in [] is string but few strings are not mongoId', () => {
                expect(everyElementShouldBeMongoId(['5fd04ae87163f9d8f03be15c', 'mongoId', 'should', 'get', 'anError'])).to.be.equal(false);
            });

            it('should return true if values in [] is string and all strings are mongoId', () => {
                expect(everyElementShouldBeMongoId(['5fd04ae87163f9d8f03be15c', '5fd04ae87163f9d8f03be15c'])).to.be.equal(true);
            });

        });

        describe('everyElementShouldBeNumber(array::[int])', () => {

            const { everyElementShouldBeNumber } = require('../helper/validatorHelper');

            it('should return false if value is empty string', () => {
                expect(everyElementShouldBeNumber('')).to.be.equal(false);
            });

            it('should return false if no param has passed into function', () => {
                expect(everyElementShouldBeNumber()).to.be.equal(false);
            });

            it('should return false if value is undefined', () => {
                expect(everyElementShouldBeNumber(undefined)).to.be.equal(false);
            });

            it('should return false if value is null', () => {
                expect(everyElementShouldBeNumber(null)).to.be.equal(false);
            });

            it('should return false if blank [] passed', () => {
                expect(everyElementShouldBeNumber([])).to.be.equal(false);
            });

            it('should return false if value is {} instead of []', () => {
                expect(everyElementShouldBeNumber({})).to.be.equal(false);
            });

            it('should return false if value is numaric instead of []', () => {
                expect(everyElementShouldBeNumber(56)).to.be.equal(false);
            });

            it('should return false if values in [] is string but that string is not numaric after parse', () => {
                expect(everyElementShouldBeNumber(['a', 'b', 'c', '6', '9'])).to.be.equal(false);
            });

            it('should return false if values in [] is string but few strings are not numaric after parse', () => {
                expect(everyElementShouldBeNumber(['1', '2', 'a', 'b', 'c'])).to.be.equal(false);
            });

            it('should return true if values in [] is numaric', () => {
                expect(everyElementShouldBeNumber([0, 12])).to.be.equal(true);
            });

        });

        describe('everyElementShouldBeString(array::[string])', () => {

            const { everyElementShouldBeString } = require('../helper/validatorHelper');

            it('should return false if value is empty string', () => {
                expect(everyElementShouldBeString('')).to.be.equal(false);
            });

            it('should return false if no param has passed into function', () => {
                expect(everyElementShouldBeString()).to.be.equal(false);
            });

            it('should return false if value is undefined', () => {
                expect(everyElementShouldBeString(undefined)).to.be.equal(false);
            });

            it('should return false if value is null', () => {
                expect(everyElementShouldBeString(null)).to.be.equal(false);
            });

            it('should return false if blank [] passed', () => {
                expect(everyElementShouldBeString([])).to.be.equal(false);
            });

            it('should return false if value is {} instead of []', () => {
                expect(everyElementShouldBeString({})).to.be.equal(false);
            });

            it('should return false if value is numaric instead of []', () => {
                expect(everyElementShouldBeString(56)).to.be.equal(false);
            });

            it('should return false if values in [] is numaric', () => {
                expect(everyElementShouldBeString([1, 2, 3, 4])).to.be.equal(false);
            });

            it('should return false if values in [] is half numaric half string', () => {
                expect(everyElementShouldBeString([1, 2, '3', '4', '5'])).to.be.equal(false);
            });

            it('should return true if all values in [] are string', () => {
                expect(everyElementShouldBeString(['0', '12'])).to.be.equal(true);
            });

        });

        describe('everyElementShouldBeObject(array::[any{}])', () => {

            const { everyElementShouldBeObject } = require('../helper/validatorHelper');

            it('should return false if value is empty string', () => {
                expect(everyElementShouldBeObject('')).to.be.equal(false);
            });

            it('should return false if no param has passed into function', () => {
                expect(everyElementShouldBeObject()).to.be.equal(false);
            });

            it('should return false if value is undefined', () => {
                expect(everyElementShouldBeObject(undefined)).to.be.equal(false);
            });

            it('should return false if value is null', () => {
                expect(everyElementShouldBeObject(null)).to.be.equal(false);
            });

            it('should return false if blank [] passed', () => {
                expect(everyElementShouldBeObject([])).to.be.equal(false);
            });

            it('should return false if value is {} instead of []', () => {
                expect(everyElementShouldBeObject({})).to.be.equal(false);
            });

            it('should return false if value is numaric instead of []', () => {
                expect(everyElementShouldBeObject(56)).to.be.equal(false);
            });

            it('should return false if values in [] is numaric instead of {}', () => {
                expect(everyElementShouldBeObject([1, 2, 3, 4])).to.be.equal(false);
            });

            it('should return false if values in [] is half numaric half {}', () => {
                expect(everyElementShouldBeObject([{}, 1, 2, {}, {}, {}])).to.be.equal(false);
            });

            it('should return true if all values in [] are {}', () => {
                expect(everyElementShouldBeObject([{ name: 'gupta' }, {}])).to.be.equal(true);
            });

        });

    });

});