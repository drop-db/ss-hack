const passport = require('passport');
const UnauthorizedError = require('../utils/APIErrors/UnauthorizedError');
const ForbiddenError = require('../utils/APIErrors/ForbiddenError');

const handleJWT = (req, res, next, roles, options) => async (err, user, info) => {
    const error = err || info;
    if (error || !user) return next(new UnauthorizedError());

    const wrongRole = roles && !roles.includes(user.role);
    if (wrongRole) {
        return next(new ForbiddenError());
    }
    req.user = user;
    return next();
};

exports.authorize = (roles = null, options = {}) => (req, res, next) =>
    passport.authenticate(
        'jwt', { session: false },
        handleJWT(req, res, next, roles, options),
    )(req, res, next);

exports.oAuth = service =>
    passport.authenticate(service, { session: false });
