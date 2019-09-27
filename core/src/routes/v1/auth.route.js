const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/v1/auth.controller');
const {
    authorize,
} = require('../../middlewares/auth');
const asyncMiddleware = require('../../middlewares/asyncMiddleware');
const validations = require('../../validations/scheme/auth.scheme.validation');

const router = express.Router();


router.post('/', validate(validations.login), asyncMiddleware(controller.login));

router.delete('/', authorize(), asyncMiddleware(controller.logout));


module.exports = router;
