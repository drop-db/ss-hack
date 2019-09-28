const httpStatus = require('http-status');
const sendResponse = require('../../utils/sendResponseV1');
const wrapAsyncMiddleware = require('../../middlewares/asyncMiddleware');

const { createUserWT } = require('../../services/users/createUser');
const { getById } = require('../../services/users/getById');
const { getListOfUsers } = require('../../services/users/getList');

async function registerUser(req, res) {
    await createUserWT(req.body);

    return sendResponse(res, httpStatus.CREATED);
}

exports.createUser = wrapAsyncMiddleware(registerUser);

async function getIm(req, res) {
    const user = await getById(req.user._id);

    return sendResponse(res, httpStatus.OK, user);
}

exports.getIm = wrapAsyncMiddleware(getIm);

async function getList(req, res) {
    const users = await getById(req.query);

    return sendResponse(res, httpStatus.OK, users);
}

exports.getList = wrapAsyncMiddleware(getList);
