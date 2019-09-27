const httpStatus = require('http-status');
const APIError = require('../APIError');
const commonErrors = require('../../errors/commonErrors');

module.exports = class ForbiddenError extends APIError {
    constructor(...errors) {
        super(httpStatus.FORBIDDEN, commonErrors.forbidden, ...errors);
    }
};
