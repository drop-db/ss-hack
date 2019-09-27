const UserToken = require('../../models/userToken.model');
const { getTime: moment } = require('../../utils/time');
const UnauthorizedError = require('../../utils/APIErrors/UnauthorizedError');
const generateTokensByUser = require('../auth/generateTokensByUser');

/**
 * Confirm user existing user
 * @param {object} data - Confirm token data
 * @param {string} data.token
 * @returns {Promise<object>}
 */
module.exports = async function confirmUserByToken(data) {
    const { token } = data;

    const userToken = await UserToken.findOne({ token }).populate('user');
    if (!userToken) throw new UnauthorizedError();

    const tokenTime = moment(userToken.expires);
    const nowTime = moment();
    if (nowTime.isAfter(tokenTime)) {
        throw new UnauthorizedError();
    }

    const [tokens] = await Promise.all([
        generateTokensByUser(userToken.user),
        userToken.remove(),
    ]);

    return tokens;
};

