const httpStatus = require('http-status');
const APIError = require('../APIError');

module.exports = class NotFoundError extends APIError {
    constructor(...errors) {
        super(httpStatus.NOT_FOUND, ...errors);
    }
};
