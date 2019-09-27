const Joi = require('joi');

const ID_LENGTH = 24;

module.exports = () => Joi.string().length(ID_LENGTH).hex();
