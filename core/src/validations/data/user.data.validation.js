const _ = require('lodash');
const DataValidator = require('../../utils/dataValidator');
const userErrors = require('../../errors/userErrors');

const wrapAsyncMiddleware = require('../../middlewares/asyncMiddleware');
const { RESET_PASS } = require('../../const/userTokens/TOKEN_TYPES');
const { EDITOR } = require('../../const/users/USER_ROLES');
const validationErrors = require('../../errors/validationErrors');


async function registerUser(req, res, next) {
    const { email } = req.body;
    await DataValidator().validateUserFound({ email }, userErrors.emailExists).validate();
    next();
}

exports.createUser = wrapAsyncMiddleware(registerUser);
