const path = require('path');
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config({path: path.join(__dirname, '/env/local.conf')});
}

// dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const pkg = require('./package.json');

// logging dependencies
const debug = require('debug')('generic:app');
const morgan = require('morgan');
const logger = require('./logger');

// routes
const api = require('./routes/api');
const index = require('./routes/index');

// define app
const app = express();

process.env.APP_VERSION = pkg.version;

app.set('views', path.join(__dirname, 'views'));

// use handlebars to serve entry point html
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.disable('x-powered-by');

if (process.env.NODE_ENV !== 'production'){
    const webpack = require('webpack');
    const compiler = webpack(require('./webpack.config'));
    app.use(
        require('webpack-dev-middleware')(compiler, {quiet: true}),
        require('webpack-hot-middleware')(compiler)
    );
    // request logging - errors
    app.use(morgan('dev', {
        skip: function (req, res) {
            return res.statusCode < 400;
        }, stream: process.stderr
    }));
    
    app.use(morgan('dev', {
        skip: function (req, res) {
            return res.statusCode >= 400;
        }, stream: process.stdout
    }));
}

if (process.env.EXPOSE_PUBLIC) {
    app.use(express.static(path.join(__dirname, 'public')));
}

// add health-check / heartbeat routes

app.use('/api', api);
app.use('/', index);

// 404 forwarding
app.use(function (req, res, next) {
    logger.error('404 -- Not Found');
    let err = new Error('Not Found');
    err.status = 404;
    debug(err);
    next(err);
})

// error handler
app.use(function (err, req, res, next) {
    // response local variables set, provide error for dev
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render error hbs page
    res.status(err.status || 500);
    res.render('error');
})

module.exports = app;

