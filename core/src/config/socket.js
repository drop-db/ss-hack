const io = require('socket.io')({ serveClient: false });
const initIo = require('../socketRoutes');

function startSocketServer(server) {
    io.attach(server, { pingInterval: 10000, pingTimeout: 20000 });
    initIo(io);
}

module.exports = {
    io,
    startSocketServer,
};
