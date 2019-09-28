const User = require('../../models/user.model');
const Chat = require('../../models/chat.model');
const emitIfActive = require('../../utils/emitIfActive');
const joinIfActive = require('../../utils/joinIfActive');
const withTransaction = require('../../utils/withTransaction');

const JOIN_CHAT_EVENT = 'chat:join';

async function updateUser(userId, data, session) {
    const {
        role,
    } = data;
    const isUserChanged = role;
    if (!isUserChanged) return;

    const user = await User.findById(userId).session(session);
    if (role) {
        user.role = role;
    }

    const chat = await Chat.findOne({ role, city: user.city }).populate('users').populate('messages').session(session);
    if (chat && role) {
        chat.push(user);
        user.chats.push(chat);
        emitIfActive(user._id, JOIN_CHAT_EVENT, { chat: chat.toDto() });
        joinIfActive(user._id, chat._id);
        await chat.save();
    }

    await user.save();
}

exports.updateUser = updateUser;
exports.updateUserWT = withTransaction(updateUser);
