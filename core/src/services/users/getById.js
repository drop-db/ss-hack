const User = require('../../models/user.model');

async function getById(userId) {
    const user = await User.findById(userId);
    const userDto = user.toDto();
    return { user: userDto };
}

exports.getById = getById;
