const express = require('express');
const userRoutes = require('./users.route');
const authRoutes = require('./auth.route');
const childRoutes = require('./child.route');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/child', childRoutes);

module.exports = router;
