const ChatMessage = require('../../models/chatMessage.model');
const Chat = require('../../models/chat.model');
const User = require('../../models/user.model');
const withTransaction = require('../../utils/withTransaction');

async function createNewMessage(fromUserId, { message, chatId, toUserId }, session) {
    if (!message) return;
    const fromUser = await User.findById(fromUserId).session(session);
    if (chatId) {
        const chat = await Chat.findById(chatId).session(session);
        if (!chat) return null;
        const [chatMessage] = await ChatMessage.create([{
            message,
            chat,
            sender: fromUser,
        }], { session });
        chat.messages.push(chatMessage);
        await chat.save();
        return { message: chatMessage };
    }
    if (!toUserId) return null;
    const toUser = await User.findById(toUserId).session(session);
    if (!toUser) return null;
    const [newChat] = await Chat.create([{
        name: `${toUser.firstName} и ${fromUser.firstName}`,
        users: [
            fromUser,
            toUser,
        ],
    }]);
    toUser.chats.push(newChat);
    fromUser.chats.push(newChat);
    await Promise.all([
        toUser.save(),
        fromUser.save(),
    ]);
    const [chatMessage] = await ChatMessage.create([{
        message,
        chat: newChat,
        sender: fromUser,
    }], { session });
    newChat.messages.push(chatMessage);
    await chatMessage.save();
    return { newChat, message: chatMessage };
}

exports.createNewMessage = createNewMessage;
exports.createNewMessageWT = withTransaction(createNewMessage);
