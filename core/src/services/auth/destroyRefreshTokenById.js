const UserToken = require('../../models/userToken.model');

module.exports = async function destroyRefreshToken(refreshTokenId) {
    const token = await UserToken.findById(refreshTokenId);
    return token.remove();
};
