const ChatMessage = require('../../models/chatMessage.model');
const Chat = require('../../models/chat.model');
const User = require('../../models/user.model');
const withTransaction = require('../../utils/withTransaction');

async function findOrCreateChat(chatId, fromUserId, toUserId, session) {
    const fromUser = await User.findById(fromUserId).session(session);
    if (!fromUser) return null;
    if (chatId) {
        const chat = await Chat.findById(chatId).session(session);
        return { chat };
    }
    const toUser = await User.findById(toUserId).session(session);
    if (!toUser) return null;
    const existedChat = await Chat.findOne({
        $or: [{
            firstUser: fromUser,
            secondUser: toUser,
        }, {
            firstUser: toUser,
            secondUser: fromUser,
        }],
    });
    if (existedChat) return { chat: existedChat };
    const [newChat] = await Chat.create([{
        name: `${toUser.firstName} и ${fromUser.firstName}`,
        firstUser: fromUser,
        secondUser: toUser,
        users: [
            fromUser,
            toUser,
        ],
    }]);
    fromUser.chats.push(newChat);
    toUser.chats.push(newChat);
    await Promise.all([
        fromUser.save(),
        toUser.save(),
    ]);
    return { chat: newChat, newChat: true };
}

async function createNewMessage(fromUserId, { message, chatId, toUserId }, session) {
    if (!message) return null;
    const chatInfo = await findOrCreateChat(chatId, fromUserId, toUserId, session);
    if (!chatInfo) return null;
    const { chat, newChat } = chatInfo;
    const [chatMessage] = await ChatMessage.create([{
        message,
        chat,
        sender: fromUserId,
    }], { session });
    chat.messages.push(chatMessage);
    await chat.save();
    return { message: chatMessage, newChat };
}

exports.createNewMessage = createNewMessage;
exports.createNewMessageWT = withTransaction(createNewMessage);
