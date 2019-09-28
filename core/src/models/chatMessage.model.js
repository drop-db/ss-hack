const mongoose = require('mongoose');
const toDtoIfHas = require('../utils/toDtoIfHas');

const { getTime: moment } = require('../utils/time');

const chatMessageSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    read: {
        type: Boolean,
        default: false,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
}, {
    versionKey: false,
    timestamps: true,
});

chatMessageSchema.pre('save', async function save(next) {
    try {
        const now = moment().toDate();
        if (this.isNew) this.createdAt = now;
        this.updatedAt = now;

        return next();
    } catch (error) {
        return next(error);
    }
});

chatMessageSchema.methods.toDto = function toDto() {
    const sender = toDtoIfHas(this.sender);
    const chat = this.chat && this.chat._id ? this.chat._id : this.chat;
    return {
        id: this._id,
        message: this.name,
        read: this.read,
        sender,
        chat,
    };
};

chatMessageSchema.statics = {
};


module.exports = mongoose.model('ChatMessage', chatMessageSchema);
