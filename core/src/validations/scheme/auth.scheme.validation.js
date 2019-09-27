const Joi = require('joi');
const User = require('../../models/user.model');

module.exports = {
    // POST /v1/auth/login
    login: {
        body: {
            password: Joi.string().min(6).max(User.USER_PROPS.PASSWORD_MAX_LENGTH).required(),
            email: Joi.string().max(User.USER_PROPS.EMAIL_MAX_LENGTH).email().required(),
        },
    },
};
