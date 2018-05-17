var express = require('express');
var bodyParser = require('body-parser');
var nconf = require('nconf');
var serverConfig = require('./config/initializers/server');

var app = express();

serverConfig.init(app, nconf, bodyParser);
serverConfig.start(app);

//Define a test endPoint to verify app
app.get('/', function(req, res){
    console.log('Hello World !!');
    res.end();
});