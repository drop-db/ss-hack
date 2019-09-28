const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const bcrypt = require('bcryptjs');
const { getTime: moment } = require('../utils/time');

const USER_ROLES = require('../const/users/USER_ROLES');
const USER_PROPS = require('../const/users/USER_PROPS');
const USER_STATUS = require('../const/users/USER_STATUS');
const TOKEN_TYPES = require('../const/userTokens/TOKEN_TYPES');

const USER_ROLES_ARRAY = Object.values(USER_ROLES);
const USER_STATUS_ARRAY = Object.values(USER_STATUS);

const HASH_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        maxlength: USER_PROPS.EMAIL_MAX_LENGTH,
        lowercase: true,
    },
    status: {
        type: String,
        default: USER_STATUS.ACTIVE,
        enum: USER_STATUS_ARRAY,
    },
    password: {
        type: String,
        required: true,
        maxlength: USER_PROPS.PASSWORD_MAX_LENGTH,
    },
    firstName: {
        trim: true,
        required: true,
        type: String,
        maxlength: USER_PROPS.FIRST_NAME_MAX_LENGTH,
    },
    lastName: {
        trim: true,
        required: true,
        type: String,
        maxlength: USER_PROPS.LAST_NAME_MAX_LENGTH,
    },
    secondName: {
        trim: true,
        type: String,
        maxlength: USER_PROPS.LAST_NAME_MAX_LENGTH,
    },
    role: {
        required: true,
        type: String,
        enum: USER_ROLES_ARRAY,
        default: USER_ROLES.CLIENT,
    },
    tokens: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserToken',
    }],
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    }],
}, {
    versionKey: false,
    timestamps: true,
});

userSchema.pre('save', async function save(next) {
    try {
        const now = moment().toDate();
        if (this.isNew) this.createdAt = now;
        this.updatedAt = now;
        if (!this.isModified('password')) return next();

        this.password = await bcrypt.hash(this.password, HASH_ROUNDS);

        return next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.getLastLogin = function getLastLogin() {
    const refreshTokens = this.tokens
        .filter(t => t.tokenType === TOKEN_TYPES.REFRESH)
        .map(t => t.createdAt);
    refreshTokens.sort();
    return refreshTokens[0];
};

userSchema.methods.toDto = function toDto(options = {}) {
    return {
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        secondName: this.secondName,
        email: this.email,
        role: this.role,
    };
};

userSchema.statics = {
    USER_ROLES,
    USER_PROPS,
    USER_STATUS,
    HASH_ROUNDS,
    USER_ROLES_ARRAY,
    USER_STATUS_ARRAY,
};

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
