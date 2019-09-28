const Joi = require('joi');
const validate = require('express-validation');
const Child = require('../../models/child.model');

// POST /v1/child/
exports.createChild = validate({
    body: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        birthday: Joi.date().required(),
        about: Joi.string().allow(''),
        house: Joi.string().valid(Child.CHILD_HOUSES_ARRAY).required(),
        sex: Joi.boolean().required(),
    },
});
