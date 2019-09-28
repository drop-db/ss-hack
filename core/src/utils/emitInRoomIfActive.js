const getSocketsInRoom = require('./getSocketsInRoom');

module.exports = function emitInRoom(roomId, event, data) {
    const stringRoomId = roomId.toString();
    const sockets = getSocketsInRoom(stringRoomId);
    sockets.forEach(s => s.emit(event, data));
};
