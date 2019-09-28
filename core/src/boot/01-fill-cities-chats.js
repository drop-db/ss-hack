const Chat = require('../models/chat.model');
const User = require('../models/user.model');
const { CONFIRMED_CURATOR, CONFIRMED_MENTOR, CONFIRMED_PSYCHOLOGIST } = require('../const/users/USER_ROLES');
const withTransaction = require('../utils/withTransaction');

const ROLES_TO_CHAT = [CONFIRMED_PSYCHOLOGIST, CONFIRMED_MENTOR, CONFIRMED_CURATOR];

const CHAT_NAMES = {
    [CONFIRMED_MENTOR]: 'Наставники',
    [CONFIRMED_PSYCHOLOGIST]: 'Психологи',
    [CONFIRMED_CURATOR]: 'Кураторы',
};

async function findOrCreateChat(city, role, session) {
    const chat = await Chat.findOne({ city, role }).session(session);
    if (chat) return chat;
    const [newChat] = await Chat.create([{
        city,
        role,
        name: CHAT_NAMES[role],
    }], { session });
    return newChat;
}

function fillCitiesChats(session) {
    return Promise.all(User.CITIES_ARRAY.map(c => Promise.all(ROLES_TO_CHAT.map(async (r) => {
        const chat = await findOrCreateChat(c, r, session);
        const users = await User.find({ city: c, role: r }).session(session);
        await Promise.all(users.map((u) => {
            const inChat = u.chats.some(cc => cc.toString() === chat._id.toString());
            if (!inChat) u.chats.push(chat);
            return u.save();
        }));
    }))));
}

module.exports = withTransaction(fillCitiesChats);
