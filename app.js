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

// routes
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
}

if (process.env.EXPOSE_PUBLIC) {
    app.use(express.static(path.join(__dirname, 'public')));
}

// add health-check / heartbeat routes

app.use('*', index);

// add error handler

module.exports = app;

