const { createNewMessageWT } = require('../services/messages/createNewMessage');
const { findOrCreateChatWT } = require('../services/messages/findOrCreateRoom');
const { readMessageWT } = require('../services/messages/readMessage');
const { getUserChats } = require('../services/messages/getUserChats');
const joinIfActive = require('../utils/joinIfActive');
const emitInRoom = require('../utils/emitInRoomIfActive');

const NEW_MESSAGE = 'messages:new';
const NEW_ROOM = 'messages:room';
const GET_CHATS = 'messages:chats';
const READ_MESSAGE = 'messages:read';

module.exports = function setMessageMessages(socket) {
    socket.on(NEW_MESSAGE, async (messageData) => {
        if (!messageData) return;
        const message = await createNewMessageWT(socket.userId, messageData);
        if (!message) return;
        emitInRoom(message.chat._id, NEW_MESSAGE, message);
    });

    socket.on(NEW_ROOM, async (roomData, ack) => {
        if (!roomData) return;
        const { userId } = roomData;
        const chat = await findOrCreateChatWT(socket.userId, userId);
        const chatId = chat._id.toString();
        socket.join(chatId);
        joinIfActive(chatId);
        ack({ chatId });
    });

    socket.on(GET_CHATS, async (getChatsData, ack) => {
        const chats = await getUserChats(socket.userId);
        if (!chats) return;
        ack({ chats });
    });

    socket.on(READ_MESSAGE, async (readMessageData) => {
        if (!readMessageData) return;
        const { messageId } = readMessageData;
        const chatId = await readMessageWT(messageId);
        if (chatId) return;
        emitInRoom(chatId, READ_MESSAGE, { messageId });
    });
};

