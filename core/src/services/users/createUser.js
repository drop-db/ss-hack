const User = require('../../models/user.model');
const { generateConfirmToken } = require('./createConfirmToken');
const { sendConfirmEmail } = require('./sendConfirmEmail');

/**
 * Register new user client
 * @param {object} data - User data
 * @param {string} data.firstName
 * @param {string} data.lastName
 * @param {string} data.email
 * @param {string} data.password
 * @param {string} data.password
 * @param {string} data.role
 * @param {string} data.timezone
 * @param {boolean} data.sendMailing
 * @param {string} [data.company]
 * @param {boolean} [data.noEmail] - Send confirm email link
 * @returns {Promise<void>}
 */
module.exports = async function createUser(data) {
    const {
        firstName,
        lastName,
        email,
        sendMailing,
        company,
        password,
        role,
        noEmail,
        timezone,
    } = data;

    const user = await User.create({
        firstName,
        lastName,
        email,
        sendMailing,
        company,
        password,
        timezone,
        role,
    });

    const confirmToken = await generateConfirmToken(user);

    await Promise.all([
        addSubscriber(email, firstName, lastName),
        !noEmail && sendConfirmEmail(confirmToken, email),
    ]);
    return user;
};
