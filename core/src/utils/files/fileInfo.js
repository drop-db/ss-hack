const fs = Promise.promisifyAll(require('fs'));

module.exports = function getFileInfo(path) {
    return fs.statAsync(path);
};
