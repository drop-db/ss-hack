// eslint-disable-next-line no-global-assign
Promise = require('bluebird');
const logger = require('./config/logger');
const { port, env } = require('./config/vars');
const app = require('./config/express');
const server = require('http').createServer(app);
const { startSocketServer } = require('./config/socket');
const mongoose = require('./config/mongoose');

startSocketServer(server);
mongoose.connect();

server.listen(port, () => logger.info(`server started on port ${port} (${env})`));

// module.exports = app;
