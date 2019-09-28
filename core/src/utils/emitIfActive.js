const getSocketByUser = require('./getSocketByUser');

module.exports = function emitIfActive(userId, event, data) {
    const userSocket = getSocketByUser(userId);
    if (!userSocket) return;
    userSocket.emit(event, data);
};
