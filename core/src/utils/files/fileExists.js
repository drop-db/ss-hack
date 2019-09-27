const getFileInfo = require('./fileInfo');
const logger = require('../../config/logger');

module.exports = async function isFileExists(path) {
    try {
        await getFileInfo(path);
        return true;
    } catch (e) {
        logger.warn(e);
        return false;
    }
};
