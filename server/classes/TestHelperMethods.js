const chai = require('chai');
const expect = chai.expect;
const CHECK = require('./CHECK');
const STATUS_CODE = require('../static data/response_status_code');

// These functions are directly tested which testing routes,
// We hooked these codes in test cases, which also make sure
// That these functions are working correctly

exports.noErrorOk = function(error, response) {
	CHECK.null(error);
	expect(response).to.have.status(STATUS_CODE.OK);
}

exports.errorUnProcessable = function(error, response) {
	CHECK.notNull(error);
	expect(response).to.have.status(STATUS_CODE.UNPROCESSABLE_ENTITY);
}

exports.errorUnauthorized = function(error, response) {
	CHECK.notNull(error);
	expect(response).to.have.status(STATUS_CODE.UNAUTHORIZED);
}

exports.errorForbidden = function(error, response) {
	CHECK.notNull(error);
	expect(response).to.have.status(STATUS_CODE.FORBIDDEN);
}

exports.errorServiceUnavailable = function(error, response) {
	CHECK.notNull(error);
	expect(response).to.have.status(STATUS_CODE.SERVICE_UNAVAILABLE);
}

exports.errorBadReq = function(error, response) {
	CHECK.notNull(error);
	expect(response).to.have.status(STATUS_CODE.BAD_REQUEST);
}

exports.bodyHasDocuments = function(response) {
	expect(response.body).to.be.an('object').which.has.property('documents');
}

exports.bodyHasDocument = function(response) {
	expect(response.body).to.be.an('object').which.has.property('document');
}

exports.bodyHasError = function(response) {
	expect(response.body).to.be.an('object').which.has.property('error');
}

exports.bodyHasMessage = function(response) {
	expect(response.body).to.be.an('object').which.has.property('message');
}

exports.documentsIsAnArray = function(response, size) {
	CHECK.toBeAnArray(response.body.documents);
	CHECK.lengthOf(response.body.documents, +size);
}

exports.documentsIsAnArrayAbove = function(response, size) {
	CHECK.toBeAnArray(response.body.documents);
	CHECK.lengthAbove(response.body.documents, +size);
}

exports.documentIsAnArray = function(response, size) {
	CHECK.toBeAnArray(response.body.document);
	CHECK.lengthOf(response.body.document, +size);
}