const httpStatus = require('http-status');
const APIError = require('../APIError');

module.exports = class DataValidationError extends APIError {
    constructor(errors) {
        super(httpStatus.UNPROCESSABLE_ENTITY, ...errors);
    }
};
