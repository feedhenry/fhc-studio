/**
 * Module dependencies.
 */

var express     = require('express'),
    routes      = require('./routes'),
    fhc         = require('fh-fhc'),
    util        = require('util'),
    fs          = require('fs'),
    ejs         = require('ejs'),
    RedisStore  = require('connect-redis')(express),
    controllers = require('./controllers');

var app = module.exports = express.createServer();

// Load FHC
fhc.fhc.load({}, function (err) {
    if (err) {
        throw new Error(err);
    }
    // Set cluster - //TODO: Targetting apps.feedhenry throws an error at the moment! odd!
    /*fhc.target(['https://apps.feedhenry.com'],
     function(err, data) {
     //success
     if (err){
     throw new Error(err);
     } 
     }
     );*/
});


// Configuration

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret:"keyboard cat", store:new RedisStore }));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});


/*
 * FIXME: Ace editor is looking for worker-javascript.js in all the wrong places. Override it's core, so it knows where to find this file
 * rather than having to do this crazy route
 */
app.get('*/worker-javascript.js', function(req, res){
  var workerJS = fs.readFileSync('public/js/lib/ace/worker-javascript.js', 'utf8'); // TODO: Make async so we can err handle
  res.send(workerJS);
});


var checkAuth = controllers.userController.checkAuth; // auth checking function
//index
app.get("/",checkAuth,controllers.indexController.indexAction);
app.get('/home.:resType?', checkAuth, controllers.indexController.indexAction);
//user actions
app.get('/register.:resType?', controllers.userController.signupAction);
app.get('/login.:resType?', controllers.userController.loginAction);
app.post('/login',controllers.userController.loginAction);
app.get('/logout', controllers.userController.logoutAction);
//app actions

app.get('/apps.:resType?', checkAuth, controllers.appController.indexAction);
app.get('/app/:id/:view?/:subOp?.:resType?', checkAuth, controllers.appController.showAppView);
app.post('/app/:id/:operation/:resourceID?.:resType?', checkAuth, controllers.appController.doOperation);

//editor actions
app.get('/editor', checkAuth, controllers.editController.indexAction);



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
