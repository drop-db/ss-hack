const User = require('../../../models/user.model');

module.exports = async function validateUserIdNotFound({where, error}) {
    const existingUser = await User.findOne(where);
    if (existingUser) return error;
    return null;
};
