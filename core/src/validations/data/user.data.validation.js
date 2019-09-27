const _ = require('lodash');
const DataValidator = require('../../utils/dataValidator');
const wrapAsyncMiddleware = require('../../middlewares/asyncMiddleware');
const { RESET_PASS } = require('../../const/userTokens/TOKEN_TYPES');
const { EDITOR } = require('../../const/users/USER_ROLES');
const validationErrors = require('../../errors/validationErrors');

const registerClientValidation = email => DataValidator().validateUserEmailExists(email);

async function registerClient(req, res, next) {
    const { email } = req.body;
    await registerClientValidation(email).validate();
    next();
}

exports.registerClientDataValidation = wrapAsyncMiddleware(registerClient);
