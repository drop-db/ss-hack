const ChatMessage = require('../../models/chatMessage.model');
const Chat = require('../../models/chat.model');
const withTransaction = require('../../utils/withTransaction');


async function createNewMessage(fromUserId, { message, chatId }, session) {
    if (!message) return null;
    const chat = await Chat.findById(chatId).session(session);
    if (!chat) return null;
    const [chatMessage] = await ChatMessage.create([{
        message,
        chat,
        sender: fromUserId,
    }], { session });
    chat.messages.push(chatMessage);
    await chat.save();
    return chatMessage.toDto();
}

exports.createNewMessage = createNewMessage;
exports.createNewMessageWT = withTransaction(createNewMessage);
