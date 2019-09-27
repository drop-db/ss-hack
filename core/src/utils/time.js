const moment = require('moment-timezone');
const { env } = require('../config/vars');

let TEST_UNIX_TIME = 1564413109;

function getTime(time) {
    if (!time && env === 'test') return moment.unix(TEST_UNIX_TIME);
    return moment(time);
}
getTime.unix = moment.unix;
exports.getTime = getTime;

exports.setTime = function setTime(unixTime) {
    TEST_UNIX_TIME = unixTime;
};
