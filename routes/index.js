const express = require('express');
const router = express.Router();
const config = require('../lib/utils/config');
const logger = require('../logger');
const scriptBundle = process.env.NODE_ENV === 'production' ? require('../public/manifest.json').main_js : 'main.js';

router.get('/', function(req, res) {
    logger.info('hit index');
    res.render('index', {
        appVersion: process.env.APP_VERSION,
        assetUrl: config['asset-url'],
        scriptBundle
    });
});

module.exports = router;
