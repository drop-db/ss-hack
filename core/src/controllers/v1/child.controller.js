const httpStatus = require('http-status');
const sendResponse = require('../../utils/sendResponseV1');
const wrapAsyncMiddleware = require('../../middlewares/asyncMiddleware');

const { createChild } = require('../../services/child/createChild');
const { getChildList } = require('../../services/child/getChildList');

async function registerChild(req, res) {
    const child = await createChild(req.body);

    return sendResponse(res, httpStatus.CREATED, { child });
}

exports.registerChild = wrapAsyncMiddleware(registerChild);

async function getChildren(req, res) {
    const children = await getChildList(req.body);

    return sendResponse(res, httpStatus.OK, children);
}

exports.getChildren = wrapAsyncMiddleware(getChildren);
