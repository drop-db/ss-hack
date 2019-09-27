const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const APIError = require('../utils/APIError');
const logger = require('../config/logger');
const validationErrors = require('../errors/validationErrors');
const commonErrors = require('../errors/commonErrors');
const sendResponse = require('../utils/sendResponseV1');

function processValidationErrors(err) {
    return err.errors.map((e) => {
        const field = e.field.includes('.') ? e.field.split('.')[0] : e.field;
        const error = validationErrors[field];
        return {
            ...error,
            details: {
                messages: e.messages,
            },
        };
    });
}

function processError(err) {
    if (err instanceof expressValidation.ValidationError) {
        const errors = processValidationErrors(err);
        return {
            errors,
            status: httpStatus.UNPROCESSABLE_ENTITY,
        };
    }

    if (!(err instanceof APIError)) {
        return {
            errors: [commonErrors.service],
            status: httpStatus.INTERNAL_SERVER_ERROR,
        };
    }

    return err;
}

function getFilesFromReqWithoutBuffer(req) {
    if (!req.files) return null;
    return Object.keys(req.files).map((k) => {
        const file = req.files[k];
        return file.map(f => ({
            ...f,
            buffer: undefined,
        }));
    });
}


function logError(err, req) {
    const files = getFilesFromReqWithoutBuffer(req);
    const reqData = {
        url: req.originalUrl,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
        headers: req.headers,
        body: req.body,
        files,
    };
    const message = '\n\t*Log internal error on *:' +
                    `\n\t*1.Stack*:\n\t${err.stack}` +
                    `\n\t*2.Req data*:\n${JSON.stringify(reqData, null, '   ')}` +
                    `\n\t*3.Message*:\n\t${err.message}\n`;
    logger.error(message);
}

async function handler(err, req, res, next) {
    const error = processError(err);

    const isInternal = error.status === httpStatus.INTERNAL_SERVER_ERROR;
    if (isInternal) {
        logError(err, req);
    }
    await sendResponse(res, error.status, {}, error.errors);
}

function notFound(req, res, next) {
    const err = new APIError(httpStatus.NOT_FOUND, commonErrors.notFound);
    return handler(err, req, res);
}

module.exports = {
    notFound,
    handler,
};
