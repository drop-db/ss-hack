const UserEditor = require('../../models/userEditor.model');
const createUser = require('./createUser');
const { EDITOR } = require('../../const/users/USER_ROLES');

/**
 * Register new user editor
 * @param {object} data - User data
 * @param {string} data.firstName
 * @param {string} data.lastName
 * @param {string} data.email
 * @param {string} data.password
 * @param {boolean} data.sendMailing
 * @param {number} data.timezone
 * @param {string} data.experience
 * @param {Array<string>} data.projectTypes
 * @param {Array<string>} data.software
 * @param {Array<string>} data.skills
 * @param {string} [data.company]
 * @param {string} [data.phone]
 * @returns {Promise<void>}
 */
module.exports = async function createEditor(data) {
    const user = await createUser({
        ...data,
        noEmail: true,
        role: EDITOR,
    });
    const {
        phone,
        experience,
        projectTypes,
        software,
        skills,
    } = data;
    user.editor = await UserEditor.create({
        phone: phone || null,
        experience,
        projectTypes,
        software,
        skills,
        user,
    });
    await user.save();
};
