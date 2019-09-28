const mongoose = require('mongoose');
const toDtoIfHas = require('../utils/toDtoIfHas');
const CITIES = require('../const/CITIES');

const CITIES_ARRAY = Object.values(CITIES);

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    city: {
        type: String,
        enum: CITIES_ARRAY,
    },
    firstUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    secondUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
