const express = require('express');
const controller = require('../../controllers/v1/users.controller');
const userSchemeValidations = require('../../validations/scheme/user.scheme.validation');
const userDataValidation = require('../../validations/data/user.data.validation');

const router = express.Router();

router.post(
    '/client', userSchemeValidations.registerClient, userDataValidation.registerClientDataValidation,
    controller.confirmUser,
);

module.exports = router;
