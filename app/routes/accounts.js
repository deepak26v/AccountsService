var express = require('express');
var configUtil = require('../../app/configUtil.js');
var accountsRouter = express.Router();

accountsRouter.get('/accounts', function (req, res, next) {
    var institutionBaseUrl = configUtil.get(req.app, false, 'institutions:nordea:baseUrl');
    var clientId = configUtil.get(req.app, true, 'my_accounts_app:client_id');
    var clientSecret = configUtil.get(req.app, true, 'my_accounts_app:client_secret');
    var accessToken = req.get('access_token');

    request({
        url: institutionBaseUrl + '/v2/accounts',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-IBM-Client-ID': clientId,
            'X-IBM-Client-Secret': clientSecret,
            'Content-Type': 'application/json'
        },
        method: 'GET'}, function (err, response) {
            res.send(JSON.parse(response.body));
    });
});

accountsRouter.get('/account/details', function (req, res, next) {
    var accountId = req.get('account_id');
    var accessToken = req.get('access_token');
    var institutionBaseUrl = configUtil.get(req.app, false, 'institutions:nordea:baseUrl');
    var clientId = configUtil.get(req.app, true, 'my_accounts_app:client_id');
    var clientSecret = configUtil.get(req.app, true, 'my_accounts_app:client_secret');

    request({
        url: institutionBaseUrl + '/v2/accounts/' + accountId,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-IBM-Client-ID': clientId,
            'X-IBM-Client-Secret': clientSecret,
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }, function (err, response) {
        res.send(JSON.parse(response.body));
    });
});

accountsRouter.get('/account/transactions', function (req, res, next) {
    var accountId = req.get('account_id');
    var accessToken = req.get('access_token');
    var institutionBaseUrl = configUtil.get(req.app, false, 'institutions:nordea:baseUrl');
    var clientId = configUtil.get(req.app, true, 'my_accounts_app:client_id');
    var clientSecret = configUtil.get(req.app, true, 'my_accounts_app:client_secret');

    request({
        url: institutionBaseUrl + '/v2/accounts/' + accountId + '/transactions',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-IBM-Client-ID': clientId,
            'X-IBM-Client-Secret': clientSecret,
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }, function (err, response) {
        res.send(JSON.parse(response.body));
    });
});

module.exports = accountsRouter;

