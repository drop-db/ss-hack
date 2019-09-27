const mongoose = require('mongoose');
const { getTime: moment } = require('../utils/time');

const TOKEN_TYPES = require('../const/userTokens/TOKEN_TYPES');

const TOKEN_TYPES_ARRAY = Object.values(TOKEN_TYPES);

const userTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    expires: {
        type: Date,
    },
    tokenType: {
        type: String,
        required: true,
        enum: TOKEN_TYPES_ARRAY,
    },
}, {
    versionKey: false,
    timestamps: true,
});

userTokenSchema.pre('save', async function save(next) {
    try {
        const now = moment().toDate();
        if (this.isNew) this.createdAt = now;
        this.updatedAt = now;

        return next();
    } catch (error) {
        return next(error);
    }
});

userTokenSchema.statics = {
    TOKEN_TYPES,
    TOKEN_TYPES_ARRAY,
};

module.exports = mongoose.model('UserToken', userTokenSchema);
