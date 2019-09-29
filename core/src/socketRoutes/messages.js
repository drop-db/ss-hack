const { createNewMessageWT } = require('../services/messages/createNewMessage');
const { findOrCreateChatWT } = require('../services/messages/findOrCreateRoom');
const { readMessageWT } = require('../services/messages/readMessage');
const { getUserChats } = require('../services/messages/getUserChats');
const joinIfActive = require('../utils/joinIfActive');
const logger = require('../config/logger');
const emitInRoom = require('../utils/emitInRoomIfActive');

const NEW_MESSAGE = 'messages:new';
const NEW_ROOM = 'messages:room';
const GET_CHATS = 'messages:chats';
const READ_MESSAGE = 'messages:read';

function logError(e, reqData) {
    const message = '\n\t*Log internal error on *:' +
        `\n\t*1.Stack*:\n\t${e.stack}` +
        `\n\t*2.Req data*:\n${JSON.stringify(reqData, null, '   ')}` +
        `\n\t*3.Message*:\n\t${e.message}\n`;
    logger.error(message);
}

module.exports = function setMessageMessages(socket) {
    socket.on(NEW_MESSAGE, async (messageData) => {
        try {
            if (!messageData) return;
            const message = await createNewMessageWT(socket.userId, messageData);
            if (!message) {
                socket.emit(NEW_MESSAGE, {});
                return;
            }
            emitInRoom(message.chat, NEW_MESSAGE, message);
        } catch (e) {
            logError(e, messageData);
        }
    });

    socket.on(NEW_ROOM, async (roomData, ack) => {
        try {
            if (!roomData) return;
            const { userId } = roomData;
            const chat = await findOrCreateChatWT(socket.userId, userId);
            if (!chat) return;
            socket.join(chat.id);
            joinIfActive(chat.id);
            ack({ chat });
        } catch (e) {
            logError(e, roomData);
        }
    });

    socket.on(GET_CHATS, async (getChatsData, ack) => {
        try {
            const chats = await getUserChats(socket.userId);
            if (!chats) return;
            ack({ chats });
        } catch (e) {
            logError(e, getChatsData);
        }
    });

    socket.on(READ_MESSAGE, async (readMessageData) => {
        try {
            if (!readMessageData) return;
            const { messageId } = readMessageData;
            const chatId = await readMessageWT(messageId);
            if (chatId) return;
            emitInRoom(chatId, READ_MESSAGE, { messageId });
        } catch (e) {
            logError(e, readMessageData);
        }
    });
};

