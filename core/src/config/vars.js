const path = require('path');

require('dotenv-safe').load({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    test: process.env.TEST,
    telegramBotKey: process.env.TELEGRAM_BOT_KEY,
    tokens: {
        access: {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
        },
        refresh: {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresHours: process.env.JWT_REFRESH_EXPIRATION_HOURS,
        },
        confirm: {
            expiresHours: process.env.JWT_CONFIRM_EXPIRATION_HOURS,
        },
        resetPass: {
            expiresHours: process.env.RESET_PASS_EXPIRATION_HOURS,
        },
    },
    noEmailRegister: process.env.NO_EMAIL_REGISTER,
    mongo: {
        uri: process.env.MONGO_URI,
    },
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    gmail: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
    webClientUrl: process.env.WEB_CLIENT_URL,
    isLocal: process.env.IS_LOCAL,
    baseStoragePath: process.env.BASE_STORAGE_PATH,
    cookieSecret: process.env.COOKIE_SECRET,
    rootStorageUrl: process.env.ROOT_STORAGE_URL,
};
