const _ = require('lodash');
const signJwt = require('../../utils/signJwt');
const { getTime: moment } = require('../../utils/time');
const UserToken = require('../../models/userToken.model');
const { tokens } = require('../../config/vars');

async function updateOrGenerateRefreshToken(user, oldRefreshToken) {
    const refreshExpires = moment().add(tokens.refresh.expiresHours, 'h');
    const refreshPayload = {
        exp: refreshExpires.unix(),
        userId: user._id,
        iat: 1,
    };
    const refreshToken = await signJwt(refreshPayload, tokens.refresh.secret, {});
    if (oldRefreshToken) {
        const oldToken = await UserToken.findOne({ token: oldRefreshToken });
        oldToken.token = refreshToken;
        oldToken.expires = refreshExpires.toDate();
        await oldToken.save();
        return oldToken;
    }
    const token = await UserToken.create({
        user,
        tokenType: UserToken.TOKEN_TYPES.REFRESH,
        token: refreshToken,
        expires: refreshExpires.toDate(),
    });
    user.tokens.push(token);
    await user.save();
    return token;
}

module.exports = async function generateTokensByUser(user, oldRefreshToken) {
    const accessExpires = moment().add(tokens.access.expiresMinutes, 'm');
    const refreshToken = await updateOrGenerateRefreshToken(user, oldRefreshToken);
    const accessPayload = {
        exp: accessExpires.unix(),
        refreshTokenId: refreshToken._id,
        userId: user._id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        iat: 1,
    };
    if (user.editor) {
        const { editor } = user;
        const bioNotEntered = !editor.bio
            || _.isEmpty(editor.schedule)
            || _.isEmpty(editor.portfolio)
            || _.isEmpty(editor.industries);
        accessPayload.bioNotEntered = bioNotEntered ? true : undefined;
    }
    const accessToken = await signJwt(accessPayload, tokens.access.secret, {});
    return {
        accessToken,
        refreshToken: refreshToken.token,
    };
};
