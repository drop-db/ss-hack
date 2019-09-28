const User = require('../../models/user.model');
const Chat = require('../../models/chat.model');
const withTransaction = require('../../utils/withTransaction');

async function findOrCreateChat(fromUserId, toUserId, session) {
    const fromUser = await User.findById(fromUserId).session(session);
    if (!fromUser) return null;
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
    if (existedChat) return existedChat;
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
    return newChat;
}

exports.findOrCreateChat = findOrCreateChat;
exports.findOrCreateChatWT = withTransaction(findOrCreateChat);
