const signJwt = require('../../utils/signJwt');
const { getTime: moment } = require('../../utils/time');
const { tokens } = require('../../config/vars');

module.exports = async function generateTokensByUser(user) {
    const accessExpires = moment().add(tokens.access.expiresMinutes, 'm');
    const accessPayload = {
        exp: accessExpires.unix(),
        userId: user._id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        iat: 1,
    };
    const accessToken = await signJwt(accessPayload, tokens.access.secret, {});
    return {
        accessToken,
    };
};
