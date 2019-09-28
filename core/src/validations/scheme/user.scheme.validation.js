const Joi = require('joi');
const validate = require('express-validation');
const User = require('../../models/user.model');

const email = Joi.string().max(User.USER_PROPS.EMAIL_MAX_LENGTH).email();
const USER_ROLES_NO_ADMIN = User.USER_ROLES_ARRAY.filter(r => r !== User.USER_ROLES.ADMIN);

// POST /v1/users/
exports.createUser = validate({
    body: {
        email: email.required(),
        password: Joi.string().min(6).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        secondName: Joi.string(),
        role: Joi.string().valid(USER_ROLES_NO_ADMIN).required(),
    },
});

//  /v1/users/
exports.getList = validate({
    query: {
        role: Joi.string().valid(USER_ROLES_NO_ADMIN),
        page: Joi.number().integer().min(1),
        perPage: Joi.number().integer().min(1),
    },
});

