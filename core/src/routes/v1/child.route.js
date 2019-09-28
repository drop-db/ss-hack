const express = require('express');
const { ADMIN, CONFIRMED_CURATOR } = require('../../const/users/USER_ROLES');
const controller = require('../../controllers/v1/child.controller');
const { authorize } = require('../../middlewares/auth');
const childSchemeValidation = require('../../validations/scheme/child.scheme.validation');

const router = express.Router();

router.post('/', authorize([ADMIN, CONFIRMED_CURATOR]), childSchemeValidation.createChild, controller.registerChild);
router.get('/', authorize([ADMIN, CONFIRMED_CURATOR]), controller.getChildren);

module.exports = router;
