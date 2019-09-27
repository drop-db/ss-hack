const httpStatus = require('http-status');
const sendResponse = require('../../utils/sendResponseV1');
const wrapAsyncMiddleware = require('../../middlewares/asyncMiddleware');

const confirmUserByToken = require('../../services/users/confirmUserByToken');
const createClient = require('../../services/users/createClient');
const setAuthCookies = require('../../utils/setAuthCookies');

async function confirmUser(req, res) {
    const tokens = await confirmUserByToken(req.params);

    setAuthCookies(tokens, res);
    return sendResponse(res, httpStatus.OK, tokens);
}

exports.confirmUser = wrapAsyncMiddleware(confirmUser);