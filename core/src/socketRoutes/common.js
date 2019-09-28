/* eslint-disable */
const { tokens } = require('../config/vars');
const parseJwt = require('../utils/parseJwt');
const User = require('../models/user.model');
const calls =require('./calls');
const messages =require('./messages');

const LOGIN_FAIL_EVENT = 'login:fail';
const LOGIN_SUCCESS_EVENT = 'login:success';

module.exports = function setCommonRoutes(io) {
    io.on('connection', async (socket) => {
        const { accessToken } = socket.handshake.query;
        try {
            const tokenData = await parseJwt(accessToken, tokens.access.secret);
            socket.userId = tokenData.userId;
            socket.tokenData = tokenData;
            socket.emit(LOGIN_SUCCESS_EVENT, {});
            const user = await User.findById(tokenData.userId);
            user.chats.map(c => socket.join(c.toString()));
            calls(socket);
            messages(socket);
        } catch (e) {
            socket.emit(LOGIN_FAIL_EVENT, {});
            socket.disconnect();
        }
    });
};

