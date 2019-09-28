const User = require('../../models/user.model');
const generateTokensByUser = require('./generateTokensByUser');

module.exports = async function getTokensByRefreshToken(userId) {
    const user = await User.findById(userId);
    const tokens = await generateTokensByUser(user);
    return { user: user.toDto(), tokens };
};
