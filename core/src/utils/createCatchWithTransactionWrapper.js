const logger = require('../config/logger');
const withTransaction = require('./withTransaction');

module.exports = function
createCatchWithTransactionsWrapper(data, tryAsync, catchAsync, errorMessage, noTrySession) {
    return async () => {
        try {
            if (noTrySession) await tryAsync(data);
            else await (withTransaction(tryAsync))(data);
        } catch (e) {
            logger.error(`${errorMessage || ''
            }\n${e.stack
            }\n${e.message}`);
            await (withTransaction(catchAsync))(data);
        }
    };
};
