const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const { logs, cookieSecret, isLocal } = require('./vars');
const strategies = require('./passport');
const error = require('../middlewares/errorHandler');
const routes = require('../routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser(cookieSecret));

app.use(morgan(logs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());

app.use(methodOverride());

app.use(helmet());

app.use(cors({
    origin: isLocal ? 'http://localhost:3000' : null,
    credentials: true,
}));

app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

app.use('/api', routes);

app.use(error.notFound);

app.use(error.handler);

module.exports = app;
