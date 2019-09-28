const express = require('express');
const { ADMIN } = require('../../const/users/USER_ROLES');
const controller = require('../../controllers/v1/users.controller');
const userSchemeValidations = require('../../validations/scheme/user.scheme.validation');
const userDataValidation = require('../../validations/data/user.data.validation');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router.post(
    '/', userSchemeValidations.createUser, userDataValidation.createUser,
    controller.createUser,
);

router.get('/im', authorize(), controller.getIm);
router.get('/', authorize([ADMIN]), userSchemeValidations.getList, controller.getList);

module.exports = router;
