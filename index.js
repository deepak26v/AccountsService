var express = require('express');
var bodyParser = require('body-parser');
var nconf = require('nconf');
var serverConfig = require('./config/initializers/server');
var app = express();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

serverConfig.init(app, nconf, bodyParser);
serverConfig.start(app);

//Define a test endPoint to verify app
app.get('/', function(req, res){
    console.log('Hello World !!');
    res.end();
});

module.exports = app;