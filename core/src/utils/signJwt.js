const jwt = Promise.promisifyAll(require('jsonwebtoken'));

module.exports = function signJwt(payload, secret, options) {
    return jwt.signAsync(payload, secret, options);
};
