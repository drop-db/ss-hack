module.exports = function setCommonRoutes(io) {
    io.on('connection', (socket) => {
        console.log('connected');
    });
};

