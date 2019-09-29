const express = require('express');
const { ADMIN } = require('../../const/users/USER_ROLES');
const controller = require('../../controllers/v1/users.controller');
const userSchemeValidations = require('../../validations/scheme/user.scheme.validation');
const userDataValidation = require('../../validations/data/user.data.validation');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router.post(
    '/', userSchemeValidations.createUser, userDataValidation.registerUser,
    controller.createUser,
);

router.get('/im', authorize(), controller.getIm);
router.get('/', authorize(), userSchemeValidations.getList, controller.getList);
router.patch('/:userId', authorize([ADMIN]), userSchemeValidations.patchUser, userDataValidation.patchUser, controller.patchUser);
router.put('/activity/:userId', authorize(), userSchemeValidations.updateLastActivity, userDataValidation.updateLastActivity, controller.updateActivity);

module.exports = router;
