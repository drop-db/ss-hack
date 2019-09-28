const User = require('../../models/user.model');
const withTransaction = require('../../utils/withTransaction');

async function updateUser(userId, data, session) {
    const {
        role,
    } = data;
    const isUserChanged = role;
    if (!isUserChanged) return;

    const user = await User.findById(userId).session(session);
    if (role) {
        user.role = role;
    }

    await user.save();
}

exports.updateUser = updateUser;
exports.updateUserWT = withTransaction(updateUser);
