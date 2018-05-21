var express = require('express');
request = require('request');
var path = require('path');
var configUtil = require('../../app/configUtil.js');
var authRouter = express.Router();

authRouter.get('/start/oauth', function (req, res, next) {
    var institutionBaseUrl = configUtil.get(req.app, false, 'institutions:nordea:baseUrl');
    var clientId = configUtil.get(req.app, true, 'my_accounts_app:client_id');
    var redirect_url = configUtil.get(req.app, true, 'my_accounts_app:redirect_url');
    var params = { client_id: clientId, state: '', redirect_uri: redirect_url};

    request({ url: institutionBaseUrl, qs: params, method: 'GET' }, function (err, response) {
        if (err == null) {
            //res.setHeader('Content-Type', 'application/json');
            if(response != null) {
                res.send(JSON.parse(response.body).args);
            }
        } else {
            res.send(null);
        }
    });
});

authRouter.get('/authentication/get_access_token', function (req, res, next) {
    var institutionBaseUrl = configUtil.get(req.app, false, 'institutions:nordea:baseUrl');
    var clientId = configUtil.get(req.app, true, 'my_accounts_app:client_id');
    var clientSecret = configUtil.get(req.app, true, 'my_accounts_app:client_secret');
    var redirect_url = configUtil.get(req.app, true, 'my_accounts_app:redirect_url');
    var code = req.get('code');

    request({
        url: institutionBaseUrl + '/access_token',
        headers: {
            'X-IBM-Client-ID' : clientId,
            'X-IBM-Client-Secret' : clientSecret},
        form: {
            code: code,
            redirect_uri: redirect_url
        },
        method: 'POST'
    }, function (err, response) {
        if(err == null) {
            //res.setHeader('Content-Type', 'application/json');
            res.send(JSON.parse(response.body));
        }
    });
});

module.exports = authRouter;