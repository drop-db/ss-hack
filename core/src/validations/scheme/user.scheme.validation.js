const Joi = require('joi');
const validate = require('express-validation');
const User = require('../../models/user.model');
const objectId = require('../../utils/customSchemeValidations/objectId');

const email = Joi.string().max(User.USER_PROPS.EMAIL_MAX_LENGTH).email();


const USER_WITHOUT_ADMIN = User.USER_ROLES_ARRAY.filter(r => r !== User.USER_ROLES.ADMIN);

const createUserValidation = {
    email: email.required(),
    password: Joi.string().min(6).max(User.USER_PROPS.PASSWORD_MAX_LENGTH).required(),
    firstName: Joi.string().max(User.USER_PROPS.FIRST_NAME_MAX_LENGTH).required(),
    lastName: Joi.string().max(User.USER_PROPS.LAST_NAME_MAX_LENGTH).required(),
    sendMailing: Joi.boolean().required(),
};


// POST /v1/users/client
exports.registerClient = validate({
    body: {
        ...createUserValidation,
    },
});

