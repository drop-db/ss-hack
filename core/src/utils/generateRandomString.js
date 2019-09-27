const uuid = require('uuid/v4');

module.exports = (length) => {
    if (!length) return uuid();
    let res = '';
    while (res.length !== length) {
        const guid = uuid();
        if (guid.length + res.length > length) {
            res += guid.substring(0, length - res.length);
        } else {
            res += guid;
        }
    }
    return res;
};
