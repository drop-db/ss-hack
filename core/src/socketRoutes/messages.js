const { createNewMessageWT } = require('../services/messages/createNewMessage');
const { findOrCreateChatWT } = require('../services/messages/findOrCreateRoom');
const joinIfActive = require('../utils/joinIfActive');
const emitInRoom = require('../utils/emitInRoomIfActive');

const NEW_MESSAGE = 'messages:new';
const NEW_ROOM = 'messages:room`';

module.exports = function setMessageMessages(socket) {
    socket.on(NEW_MESSAGE, async (messageData) => {
        const message = await createNewMessageWT(socket.userId, messageData);
        if (!message) return;
        emitInRoom(message.chat._id, NEW_MESSAGE, message);
    });

    socket.on(NEW_ROOM, async (roomData, ack) => {
        const { userId } = roomData;
        const chat = await findOrCreateChatWT(socket.userId, userId);
        const chatId = chat._id.toString();
        socket.join(chatId);
        joinIfActive(chatId);
        ack({ chatId });
    });
};

