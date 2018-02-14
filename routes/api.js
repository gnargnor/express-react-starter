const express = require('express');
const router = express.Router();

const request = require('axios');

/**
 * Optional for communicating with an external API
 * All api calls are routed to /api
 * Express app catches calls, interprets them, and routes them accordingly
 * This eliminates the need to create a new endpoint for every new route (#nice)
 */
router.all('/*', function (req, res, next) {
    // set the url to be the environment defined api url followed by the request url
    let url = `${process.env.API_URL}${req.url}`;
    let reqObject = {
        method: req.method,
        url
        // headers: {api-key?}
    };

    if (req.method !== 'GET') requestObj.data = req.body;
    request(requestObj)
        .then(result => {
            console.info(result.data);
            return res.json(result.data);
        })
        .catch(err => {
            // this is set up to respond to servers that attach status and data to errors
            if (err.response) {
                return res.status(err.response.status).json(err.response.data);
            }
            // otherwise, let the error continue
            next(err);
        });
});

module.exports = router;