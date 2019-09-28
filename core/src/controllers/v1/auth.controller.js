const httpStatus = require('http-status');
const getTokensByEmailAndPassword = require('../../services/auth/getTokensByEmailAndPassword');
const getTokensByRefresh = require('../../services/auth/getTokensByRefresh');
const destroyRefreshTokenById = require('../../services/auth/destroyRefreshTokenById');
const sendResponse = require('../../utils/sendResponseV1');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const { tokens, user } = await getTokensByEmailAndPassword(email, password);
    return sendResponse(res, httpStatus.OK, {
        ...user,
        accessToken: tokens.accessToken,
    });
};

exports.refresh = async (req, res) => {
    const { tokens, user } = await getTokensByRefresh(req.user._id);
    return sendResponse(res, httpStatus.OK, {
        ...user,
        accessToken: tokens.accessToken,
    });
};

exports.logout = async (req, res) => {
    const { refreshTokenId } = req.user.tokenPayload;
    await destroyRefreshTokenById(refreshTokenId);
    return sendResponse(res, httpStatus.OK);
};
