const DataValidator = require('../../utils/dataValidator');
const userErrors = require('../../errors/userErrors');

const wrapAsyncMiddleware = require('../../middlewares/asyncMiddleware');


async function registerUser(req, res, next) {
    const { email } = req.body;
    await DataValidator().validateUserFound({ email }, userErrors.emailExists).validate();
    next();
}

exports.registerUser = wrapAsyncMiddleware(registerUser);

async function patchUser(req, res, next) {
    const { userId } = req.params;
    await DataValidator().validateUserNotFound({ _id: userId }, userErrors.userNotFound).validate();
    next();
}

exports.patchUser = wrapAsyncMiddleware(patchUser);

async function updateLastActivity(req, res, next) {
    const { userId } = req.params;
    await DataValidator().validateUserNotFound({ _id: userId }, userErrors.userNotFound).validate();
    next();
}

exports.updateLastActivity = wrapAsyncMiddleware(updateLastActivity);
