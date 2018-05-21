module.exports = {
    init: function (app, nconf, bodyParser) {
        nconf.file('config/environments/config.json');
        app.set('config', nconf);
        app.set('env', process.env.NODE_ENV);
        app.use(bodyParser.json());

        //Configure Middlewares before registering any routes
        //configureMiddleware(app);

        //Configure all Routers
        configureRouters(app);
        //console.log(app.get('config').get(env + ':database:username'));
    },

    //Register and start server
    start: function (app) {
        var port = app.get('config').get('http:port');
        app.listen(port, function (err) {
            if (err) {
                console.log('Could not start NodeJs server :' + err);
            } else {
                console.log('Node Server started successfully on port:' + port);
            }
        });
    }
};

    function configureMiddleware (app) {
        app.use(function (req, res, next) {
            res.header("Content-type", 'application/json');
            next();
        });
    }

    function configureRouters (app) {
        var authRouter = require('../../app/routes/auth.js');
        var accountsRouter = require('../../app/routes/accounts.js');

        app.use('/myaccounts/v1', authRouter);
        app.use('/myaccounts/v1/service', accountsRouter);
    }