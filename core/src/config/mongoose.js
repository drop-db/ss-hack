const mongoose = require('mongoose');
const Migrate = require('migrate-mongoose');
const logger = require('./logger');
const { mongo, env } = require('./vars');
const runBootTasks = require('../boot');

const MIGRATIONS_PATH = './src/migrations/';
const RECONNECT_TIMEOUT = 15000;

const migrate = new Migrate({
    connection: mongoose.connection,
    autosync: true,
    migrationsPath: MIGRATIONS_PATH,
});

mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;

if (env === 'development') {
    mongoose.set('debug', true);
}

function connect() {
    mongoose.connect(mongo.uri, {
        keepAlive: 1,
        useNewUrlParser: true,
    });
    const { connection } = mongoose;
    migrate.run('up')
        .then(runBootTasks)
        .catch(logger.error);
    return connection;
}

mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`);
    setTimeout(connect, RECONNECT_TIMEOUT);
});

exports.connect = connect;