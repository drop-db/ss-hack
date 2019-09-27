const User = require('../../../models/user.model');
const userErrors = require('../../../errors/userErrors');

module.exports = async function validateUserIdNotFound(where) {
    const existingUser = await User.findOne(where);
    if (!existingUser) return userErrors.userNotFound;
    return null;
};
