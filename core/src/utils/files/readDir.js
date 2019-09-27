const fs = Promise.promisifyAll(require('fs'));

module.exports = path => fs.readdirAsync(path);
