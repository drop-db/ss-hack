const mongoose = require('mongoose');
const toDtoIfHas = require('../utils/toDtoIfHas');

const { getTime: moment } = require('../utils/time');

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatMessage',
    }],
}, {
    versionKey: false,
});

chatSchema.methods.toDto = function toDto() {
    const users = toDtoIfHas(this.users);
    return {
        id: this._id,
        name: this.name,
        users,
    };
};

chatSchema.statics = {};


module.exports = mongoose.model('Chat', chatSchema);
