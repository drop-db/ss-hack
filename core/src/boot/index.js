const fillCitiesChats = require('./01-fill-cities-chats');

module.exports = async function runBootTasks() {
    await fillCitiesChats();
};
