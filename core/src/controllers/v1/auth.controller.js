const httpStatus = require('http-status');
const getTokensByEmailAndPassword = require('../../services/auth/getTokensByEmailAndPassword');
const destroyRefreshTokenById = require('../../services/auth/destroyRefreshTokenById');
const sendResponse = require('../../utils/sendResponseV1');
const setAuthCookies = require('../../utils/setAuthCookies');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const tokens = await getTokensByEmailAndPassword(email, password);
    setAuthCookies(tokens, res);
    return sendResponse(res, httpStatus.OK, tokens);
};

exports.logout = async (req, res) => {
    const { refreshTokenId } = req.user.tokenPayload;
    await destroyRefreshTokenById(refreshTokenId);
    return sendResponse(res, httpStatus.OK);
};
