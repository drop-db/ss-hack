const express = require('express');
const httpStatus = require('http-status');
const routesV1 = require('./v1');
const { getTime: moment } = require('../utils/time');

const router = express.Router();


router.use('/v1', routesV1);

router.get('/', (req, res) => {
    res.status(httpStatus.OK).json({
        serverTime: moment().toDate(),
    });
});

module.exports = router;
