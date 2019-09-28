const getSocketByUser = require('./getSocketByUser');

module.exports = function emitIfActive(userId, room) {
    const userSocket = getSocketByUser(userId);
    if (!userSocket) return;
    const roomString = room.toString();
    userSocket.join(roomString);
};
