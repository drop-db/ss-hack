const User = require('../../models/user.model');
const Chat = require('../../models/chat.model');
const withTransaction = require('../../utils/withTransaction');

async function getUserChats(userId) {
    const user = await User.findById(userId).populate({
        path: 'chats',
        populate: {
            path: 'messages',
            populate: {
                path: 'sender',
            },
        },
    });
    if (!user) return null;
    if (user.role === User.USER_ROLES.ADMIN) {
        const chats = await Chat.find()
            .populate({
                path: 'messages',
                populate: {
                    path: 'sender',
                },
            })
            .populate('users');
        return chats.map(c => c.toDto()).filter(c => c.messages.length && c.users.length);
    }
    return user.chats.map(c => c.toDto()).filter(c => c.messages.length);
}

exports.getUserChats = getUserChats;
exports.getUserChats = withTransaction(getUserChats);
