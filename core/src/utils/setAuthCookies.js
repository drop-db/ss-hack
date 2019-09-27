const { tokens: { access } } = require('../config/vars');

const M_SECONDS_IN_MINUTES = 60 * 1000;

module.exports = function setAuthCookies({ accessToken }, res) {
    res.cookie('AUTHENTICATION', accessToken, {
        maxAge: access.expiresMinutes * M_SECONDS_IN_MINUTES,
        httpOnly: true,
        sameSite: true,
    });
};
