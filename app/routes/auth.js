var express = require('express');
var request = require('request');
var authRouter = express.Router();

authRouter.get('/start/oauth', function(req, res) {
    request("https://httpbin.org/get", function(err, body){
        res.json(body);
    });
});

module.exports = authRouter;
