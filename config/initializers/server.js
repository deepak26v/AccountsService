module.exports = {
    init : function (app, nconf, bodyParser){
       nconf.file('config/environments/config.json');

       app.set('port', nconf.get('http:port'));
       app.use(bodyParser.json());

       //Configure Middlewares before registering any routes
       //configureMiddleware(app);

       //Configure all Routers
       configureRouters(app);
   },

   //Register and start server
   start : function (app) {
       var port = app.get('port');
       app.listen(port, function(err){
           if(err) {
               console.log('Could not start NodeJs server :' + err);
           } else {
               console.log('Node Server started successfully on port:' + port);
           }
       });
   }
}

function configureMiddleware(app) {
   app.use(function (req, res, next) {
       res.header("Content-type", 'application/json');
       next();
   });
}

function configureRouters(app) {
   var authRouter = require('../../app/routes/auth.js');

   app.use('/accounts/v1', authRouter);
}