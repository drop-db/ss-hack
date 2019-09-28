const emitIfActive = require('../utils/emitIfActive');

const WEB_RTC_EVENT = 'calls:webrtc';
const START_CALL_EVENT = 'calls:start';
const ACCEPT_CALL_EVENT = 'calls:accept';
const STOP_CALL_EVENT = 'calls:stop';

module.exports = function setCallMessages(socket) {
    socket.on(START_CALL_EVENT, (callData) => {
        if (!callData) return;
        const { toUserId } = callData;
        if (!toUserId) return;
        emitIfActive(toUserId, START_CALL_EVENT, callData);
    });
    socket.on(ACCEPT_CALL_EVENT, (callData) => {
        if (!callData) return;
        const { toUserId } = callData;
        if (!toUserId) return;
        emitIfActive(toUserId, ACCEPT_CALL_EVENT, callData);
    });
    socket.on(STOP_CALL_EVENT, (callData) => {
        if (!callData) return;
        const { toUserId } = callData;
        if (!toUserId) return;
        emitIfActive(toUserId, STOP_CALL_EVENT, callData);
    });
    socket.on(WEB_RTC_EVENT, (callData) => {
        if (!callData) return;
        const { toUserId } = callData;
        if (!toUserId) return;
        emitIfActive(toUserId, WEB_RTC_EVENT, callData);
    });
};

