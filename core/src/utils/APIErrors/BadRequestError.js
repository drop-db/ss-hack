const httpStatus = require('http-status');
const APIError = require('../APIError');
const commonErrors = require('../../errors/commonErrors');

module.exports = class BadRequestError extends APIError {
    constructor() {
        super(httpStatus.BAD_REQUEST, commonErrors.badRequest);
    }
};
