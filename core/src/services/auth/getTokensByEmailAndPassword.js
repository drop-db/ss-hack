const httpStatus = require('http-status');
const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const userErrors = require('../../errors/userErrors');
const generateTokensByUser = require('./generateTokensByUser');
const UnauthorizedError = require('../../utils/APIErrors/UnauthorizedError');
const APIError = require('../../utils/APIError');

module.exports = async function getTokensByEmailAndPassword(email, password) {
    const lowerEmail = email.toLowerCase();
    const user = await User.findOne({ email: lowerEmail }).populate('editor');
    if (!user || user.status === User.USER_STATUS.BLOCKED) throw new UnauthorizedError();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedError();

    if (!user.isConfirmed) throw new APIError(httpStatus.FORBIDDEN, userErrors.userNotConfirmed);

    return generateTokensByUser(user);
};
