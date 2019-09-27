const createUser = require('./createUser');
const { CLIENT } = require('../../const/users/USER_ROLES');

/**
 * Register new user client
 * @param {object} data - User data
 * @param {string} data.firstName
 * @param {string} data.lastName
 * @param {string} data.email
 * @param {string} data.password
 * @param {boolean} data.sendMailing
 * @param {string} [data.company]
 * @returns {Promise<void>}
 */
module.exports = function createClient(data) {
    return createUser({
        ...data,
        role: CLIENT,
    });
};
