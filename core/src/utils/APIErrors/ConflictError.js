const httpStatus = require('http-status');
const APIError = require('../APIError');

module.exports = class ConflictError extends APIError {
    constructor(...errors) {
        super(httpStatus.CONFLICT, ...errors);
    }
};
