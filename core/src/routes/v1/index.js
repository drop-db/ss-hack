const express = require('express');
const userRoutes = require('./users.route');
const authRoutes = require('./auth.route');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
