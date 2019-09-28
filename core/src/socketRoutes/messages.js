const { createNewMessageWT } = require('../services/messages/createNewMessage');
const joinIfActive = require('../utils/joinIfActive');
const emitInRoom = require('../utils/emitInRoomIfActive');

const NEW_MESSAGE = 'messages:new';

module.exports = function setMessageMessages(socket) {
    socket.on(NEW_MESSAGE, async (messageData) => {
        const res = await createNewMessageWT(socket.userId, messageData);
        if (!res) return;
        const { newChat, message } = await createNewMessageWT(socket.userId, messageData);
        const eventData = message.toDto();
        if (newChat) {
            socket.join(newChat._id);
            const { toUserId } = messageData;
            joinIfActive(toUserId, newChat._id);
            return;
        }
        emitInRoom(message.chat._id, NEW_MESSAGE, eventData);
    });
};

