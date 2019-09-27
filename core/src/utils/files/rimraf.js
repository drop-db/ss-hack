const rmrf = require('ss-hack/core/src/utils/rimraf');

module.exports = function rimraf(path, options = {}) {
    return new Promise((resolve, reject) => {
        rmrf(path, options, (err) => {
            if (err) return reject(err);
            return resolve();
        });
    });
};
