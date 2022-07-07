const chai = require('chai');
const expect = chai.expect;

// These functions are directly tested which testing routes,
// We hooked these codes in test cases, which also make sure
// That these functions are working correctly

class CHECK {

    static includes(array, value) {
        this.insideArray(array, value);
    }

    static lengthOf(array, size) {
        this.toBeAnArray(array);
        expect(array).to.have.lengthOf(size);
    }

    static lengthAbove(array, size) {
        this.toBeAnArray(array);
        expect(array).has.length.above(size);
    }

    static equal(valueOne, valueTwo) {
        expect(valueOne).to.be.equal(valueTwo);  
    }

    static notEqual(valueOne, valueTwo) {
        expect(valueOne).to.not.be.equal(valueTwo);  
    }

    static match(string, shouldHave) {
        const regex = new RegExp(String.raw`${shouldHave}`);
        expect(string).to.match(regex);
    }

    static notMatch(string, shouldHave) {
        const regex = new RegExp(String.raw`${shouldHave}`);
        expect(string).to.not.match(regex);
    }

    static toBeAnArray(field) {
        expect(field).to.be.an('array');
    }

    static toBeADate(field) {
        expect(field).to.be.an('date');
    }

    static toBeAnObject(field) {
        expect(field).to.be.an('object');
    }

    static mustBeGreaterThen(field, greaterThenValue) {
        expect(field).to.be.greaterThan(greaterThenValue);
    }

    static notInsideArray(field, shouldNotInclude) {
        this.toBeAnArray(field);
        expect(field).that.not.includes(shouldNotInclude);
    }

    static insideArray(field, shouldInclude) {
        this.toBeAnArray(field);
        expect(field).that.includes(shouldInclude);
    }

    static shouldUndefined(o) {
        expect(o).to.be.undefined;
    }

    static shouldNotUndefined(o) {
        expect(o).to.not.be.undefined;
    }

    static isEmpty(value) {
        expect(value).to.empty;
    }

    static notEmpty(value) {
        expect(value).not.empty;
    }

    static notNull(o) {
        expect(o).to.not.null;
    }

    static null(o) {
        expect(o).to.be.null;
    }

    static hasProperty(o, property) {
        expect(o).to.be.an('object');
        expect(o).to.have.property(property);
    }

    static notHasProperty(o, property) {
        expect(o).to.be.an('object');
        expect(o).to.not.have.property(property);
    }

    static hasValue(o, value) {
        expect(o).to.includes(value);
    }

}

module.exports = CHECK;