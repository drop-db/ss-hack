const winston = require('winston');

const TelegramLogger = require('winston-telegram');
const { telegramBotKey } = require('../config/vars');


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
    ),
    transports: [
        new TelegramLogger({
            token: telegramBotKey,
            chatId: '-395912304',
        }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

logger.stream = {
    write: (message) => {
        logger.info(message.trim());
    },
};

module.exports = logger;
