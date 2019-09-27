const User = require('../../models/user.model');
const generateTokensByUser = require('./generateTokensByUser');
const generateRandomString = require('../../utils/generateRandomString');
const UnauthorizedError = require('../../utils/APIErrors/UnauthorizedError');

async function findOrCreateUser(externalUser) {
    const {
        id,
        firstName,
        lastName,
        email,
        company,
        sendMailing,
        service,
    } = externalUser;

    const user = await User.findOne({ $or: [{ [`services.${service}`]: id }, { email }] });
    if (user) return user;

    const password = generateRandomString();
    return User.create({
        firstName,
        lastName,
        email,
        password,
        company,
        sendMailing,
        services: {
            [service]: id,
        },
    });
}

module.exports = async function getTokensByExternalUser(externalUser) {
    const user = await findOrCreateUser(externalUser);

    if (user.status === User.USER_STATUS.BLOCKED) throw new UnauthorizedError();
    return generateTokensByUser(user);
};
