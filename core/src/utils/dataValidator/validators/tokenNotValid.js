const UserToken = require('../../../models/userToken.model');
const userErrors = require('../../../errors/userErrors');
const { getTime: moment } = require('../../time');

module.exports = async function validateTokenNotFound({ where, checkExpired }) {
    const token = await UserToken.findOne(where);
    if (!token) return userErrors.userTokenNotFound;
    if (!checkExpired) return null;
    const nowTime = moment();
    if (nowTime.isAfter(token.expires)) return userErrors.userTokenExpired;
    return null;
};
