const UserToken = require('../../models/userToken.model');
const { getTime: moment } = require('../../utils/time');
const { tokens } = require('../../config/vars.js');
const parseJwt = require('../../utils/parseJwt');
const UnauthorizedError = require('../../utils/APIErrors/UnauthorizedError');
const generateTokensByUser = require('./generateTokensByUser');

async function getRefreshPayload(token) {
    try {
        return await parseJwt(token, tokens.refresh.secret);
    } catch (e) {
        throw new UnauthorizedError();
    }
}

module.exports = async function getTokensByRefreshToken(refreshToken) {
    const payload = await getRefreshPayload(refreshToken);
    const token = await UserToken.findOne({ token: refreshToken }).populate({
        path: 'user',
        populate: 'editor',
    });
    if (!token) throw new UnauthorizedError();
    const payloadExpires = moment.unix(payload.exp).unix();
    const tokenExpires = moment(token.expires).unix();
    if (!token || payloadExpires !== tokenExpires) throw new UnauthorizedError();
    return generateTokensByUser(token.user, refreshToken);
};
