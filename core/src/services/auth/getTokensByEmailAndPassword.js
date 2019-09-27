const httpStatus = require('http-status');
const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const userErrors = require('../../errors/userErrors');
const generateTokensByUser = require('./generateTokensByUser');
const UnauthorizedError = require('../../utils/APIErrors/UnauthorizedError');
const APIError = require('../../utils/APIError');

module.exports = async function getTokensByEmailAndPassword(email, password) {
    const lowerEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: lowerEmail });
    if (!user || user.status === User.USER_STATUS.NOT_CONFIRMED) throw new UnauthorizedError();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedError();

    const tokens = await generateTokensByUser(user);
    return {
        tokens,
        user: user.toDto(),
    };
};
