const httpStatus = require('http-status');
const sendResponse = require('../../utils/sendResponseV1');
const wrapAsyncMiddleware = require('../../middlewares/asyncMiddleware');

const { createUserWT } = require('../../services/users/createUser');
const { getById } = require('../../services/users/getById');
const { getListOfUsers } = require('../../services/users/getList');
const { updateUserWT } = require('../../services/users/updateUser');

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
    const users = await getListOfUsers(req.query);

    return sendResponse(res, httpStatus.OK, users);
}

exports.getList = wrapAsyncMiddleware(getList);

async function patchUser(req, res) {
    await updateUserWT(req.params.userId, req.body);

    return sendResponse(res, httpStatus.OK);
}

exports.patchUser = wrapAsyncMiddleware(patchUser);
