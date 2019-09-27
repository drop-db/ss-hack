const jwt = Promise.promisifyAll(require('jsonwebtoken'));

module.exports = function parseJwt(token, secret) {
    return jwt.verifyAsync(token, secret);
};
