const httpStatus = require('http-status');
const sendResponse = require('../../utils/sendResponseV1');
const wrapAsyncMiddleware = require('../../middlewares/asyncMiddleware');

const confirmUserByToken = require('../../services/users/confirmUserByToken');
const {createUserWT} = require('../../services/users/createUser');
const createClient = require('../../services/users/createClient');
const setAuthCookies = require('../../utils/setAuthCookies');

async function registerUser(req, res) {
     await createUserWT(req.body);

    return sendResponse(res, httpStatus.CREATED);
}

exports.createUser = wrapAsyncMiddleware(registerUser);