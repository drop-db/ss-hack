const User = require('../../models/user.model');
const { noEmailRegister } = require('../../config/vars');
const { generateConfirmToken } = require('./createConfirmToken');
const { sendConfirmEmail } = require('./sendConfirmEmail');
const withTransaction = require('../../utils/withTransaction');

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
async function createUser(data, session) {
    const {
        firstName,
        lastName,
        email,
        password,
        role,
        secondName,
        phone,
        isMarried,
        birthday,
        livingArea,
        city,
        sendMailing,
        profession,
        isFullTime,
        post,
        hobbies,
        experience,
        about,
        hasCar,
        education,
        sex,
        hasChild,
    } = data;

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        secondName,
        role,
        phone,
        isMarried,
        birthday,
        livingArea,
        city,
        sendMailing,
        profession,
        isFullTime,
        post,
        hobbies,
        experience,
        about,
        education,
        hasCar,
        hasChild,
        sex,
        status: noEmailRegister ? User.USER_STATUS.ACTIVE : User.USER_STATUS.NOT_CONFIRMED,
    });

    if (!noEmailRegister) {
        const confirmToken = await generateConfirmToken(user, session);
        await sendConfirmEmail(confirmToken, email);
    }

    return user;
}

exports.createUser = createUser;
exports.createUserWT = withTransaction(createUser);
