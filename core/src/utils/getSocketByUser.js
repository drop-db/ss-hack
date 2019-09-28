module.exports = function getSocketByUserId(userId) {
    const stringUserId = userId.toString();
    // eslint-disable-next-line global-require
    const { io } = require('../config/socket');
    return Object.values(io.sockets.connected).find(s => s.userId === stringUserId);
};
