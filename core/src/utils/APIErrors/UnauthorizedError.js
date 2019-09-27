const httpStatus = require('http-status');
const APIError = require('../APIError');
const commonErrors = require('../../errors/commonErrors');

module.exports = class UnauthorizedError extends APIError {
    constructor() {
        super(httpStatus.UNAUTHORIZED, commonErrors.unauthorized);
    }
};
