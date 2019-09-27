const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { tokens } = require('./vars');
const User = require('../models/user.model');
const UserToken = require('../models/userToken.model');

function extractFromCookie(req) {
    return req.signedCookies.AUTHENTICATION;
}

const jwtOptions = {
    secretOrKey: tokens.access.secret,
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        extractFromCookie,
    ]),
};

const jwt = async (payload, done) => {
    try {
        const user = await User.findById(payload.userId);
        if (user) {
            user.tokenPayload = payload;
            return done(null, user, null);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
};

const oAuth = service => async (token, done) => {
    try {
        const userData = await authProviders[service](token);
        return done(null, userData);
    } catch (err) {
        return done(err);
    }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);
