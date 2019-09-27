const { getTime: moment } = require('../../utils/time');
const { tokens } = require('../../config/vars.js');
const generateRandomString = require('../../utils/generateRandomString');
const UserToken = require('../../models/userToken.model');

async function generateConfirmToken(user, session) {
    const confirmTokenString = generateRandomString();
    const tokenExpiresDate = moment().add(tokens.confirm.expiresHours, 'h').toDate();
    const existingToken = await UserToken.findOne({
        user,
        tokenType: UserToken.TOKEN_TYPES.CONFIRM,
    }).session(session);
    if (existingToken) {
        existingToken.token = confirmTokenString;
        existingToken.expires = tokenExpiresDate;
        await existingToken.save();
        return existingToken;
    }
    const [token] = await UserToken.create([{
        user,
        token: confirmTokenString,
        expires: tokenExpiresDate,
        tokenType: UserToken.TOKEN_TYPES.CONFIRM,
    }], { session });
    user.tokens.push(token);
    await user.save();

    return token;
}

exports.generateConfirmToken = generateConfirmToken;
