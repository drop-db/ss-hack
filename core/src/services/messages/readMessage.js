const ChatMessage = require('../../models/chatMessage.model');
const withTransaction = require('../../utils/withTransaction');

async function readMessage(messageId, session) {
    if (messageId) return null;
    const message = await ChatMessage.findById(messageId).session(session);
    if (!message) return null;
    await ChatMessage.updateMany({ chat: message.chat, createdAt: { $lte: message.createdAt } });
    return message.chat;
}

exports.readMessage = readMessage;
exports.readMessageWT = withTransaction(readMessage);
