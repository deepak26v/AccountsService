var express = require('express');
request = require('request');
var path = require('path');
var configUtil = require('../../app/configUtil.js');
var authRouter = express.Router();

authRouter.get('/start/oauth', function (req, res, next) {
    var institutionBaseUrl = configUtil.get(req.app, false, 'institutions:nordea:baseUrl');
    var clientId = configUtil.get(req.app, true, 'my_accounts_app:client_id');
    var redirect_uri = configUtil.get(req.app, true, 'my_accounts_app:client_secret');
    var params = { client_id: clientId, state: '', redirect_uri: redirect_uri}
    
    request({ url: institutionBaseUrl + '/v1/authentication', qs: params, method: 'GET' }, function (err, response) {
        if (err == null) {
            res.setHeader('Content-Type', 'application/json');
            if(response != null) {
                res.send(JSON.parse(response.body).args);
            }
        } else {
            res.send(null);
        }
    });
});

module.exports = authRouter;