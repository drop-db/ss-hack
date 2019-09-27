const mongoose = require('mongoose');

module.exports = function withTransaction(func, onRollback) {
    return async (...args) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const res = await func(...args, session);
            await session.commitTransaction();
            return res;
        } catch (e) {
            await session.abortTransaction();
            if (onRollback) await onRollback(...args);
            throw e;
        } finally {
            session.endSession();
        }
    };
};
