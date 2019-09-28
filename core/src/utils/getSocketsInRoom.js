module.exports = function getSocketsInRoom(roomId) {
    const stringRoomId = roomId.toString();
    // eslint-disable-next-line global-require
    const { io } = require('../config/socket');
    const room = io.sockets.adapter.rooms[stringRoomId];
    return room ? Object.keys(room.sockets).map(id => io.sockets.connected[id]) : [];
};
