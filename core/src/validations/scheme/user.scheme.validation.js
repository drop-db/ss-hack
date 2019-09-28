const Joi = require('joi');
const validate = require('express-validation');
const User = require('../../models/user.model');
const objectId = require('../../utils/customSchemeValidations/objectId');

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
        phone: Joi.string().required(),
        isMarried: Joi.boolean().required(),
        hasCar: Joi.boolean().required(),
        hasChild: Joi.boolean().required(),
        birthday: Joi.date().required(),
        livingArea: Joi.string().required(),
        profession: Joi.string().required(),
        experience: Joi.string().required(),
        about: Joi.string().required(),
        post: Joi.string().required(),
        hobbies: Joi.array().items(Joi.string()).min(1).required(),
        education: Joi.string().required(),
        city: Joi.string().valid(User.CITIES_ARRAY).required(),
        sendMailing: Joi.boolean().required(),
        sex: Joi.boolean().required(),
        isFullTime: Joi.boolean().required(),
    },
});

//  GET /v1/users/
exports.getList = validate({
    query: {
        role: Joi.string().valid(USER_ROLES_NO_ADMIN),
        page: Joi.number().integer().min(1),
        perPage: Joi.number().integer().min(1),
    },
});

//  PATCH /v1/users/:userId
exports.patchUser = validate({
    params: {
        userId: objectId(),
    },
    body: {
        role: Joi.string().valid(User.USER_ROLES_ARRAY),
    },
});

