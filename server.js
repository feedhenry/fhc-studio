/**
 * Module dependencies.
 */

var express     = require('express'),
    fhc         = require('fh-fhc'),
    util        = require('util'),
    fs          = require('fs'),
    controllers = require('./controllers');

var server = module.exports = express.createServer();

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

server.configure(function () {

    server.set('views', __dirname + '/views');
    server.set('view engine', 'jade');

    server.set('env',"development"); //change this when goes to prod

    server.use(express.bodyParser());
    server.use(express.cookieParser());
    
    server.use(express.methodOverride());
    
    server.use(express.static(__dirname + '/client'));
});

server.configure('development', function () {
    server.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
    server.use(express.session({ secret:"keyboard cat"}));
    server.use(server.router);
});

server.configure('production', function () {
    server.use(express.errorHandler());
    var RedisStore  = require('connect-redis')(express);
    server.use(express.session({ secret:"keyboard cat", store:new RedisStore }));
    server.use(server.router);
});


/*
 * FIXME: Ace editor is looking for worker-javascript.js in all the wrong places. Override it's core, so it knows where to find this file
 * rather than having to do this crazy route
 */
server.get('*/worker-javascript.js', function(req, res){
  var workerJS = fs.readFileSync('public/js/lib/ace/worker-javascript.js', 'utf8'); // TODO: Make async so we can err handle
  res.send(workerJS);
});


var checkAuth = controllers.userController.checkAuth; // auth checking function
//index



server.get("/",controllers.indexController.indexAction);

server.get('/home.:resType?', checkAuth, controllers.indexController.indexAction);
//user actions
server.get('/register.:resType?', controllers.userController.signupAction);
server.get('/login.:resType?', controllers.userController.loginAction);
server.post('/login',controllers.userController.loginAction);
server.get('/logout', controllers.userController.logoutAction);
//app actions

server.get('/apps.:resType?', checkAuth, controllers.appController.indexAction);
server.get('/app/:id/:view?/:subOp?.:resType?', checkAuth, controllers.appController.showAppView);
server.post('/app/:id/:operation/:resourceID?.:resType?', checkAuth, controllers.appController.doOperation);

//editor actions
server.get('/editor', checkAuth, controllers.editController.indexAction);
server.get("/editor/gist",controllers.editController.gistAction);

server.get("/editor/gist",controllers.editController.gist);

server.listen(3000);

console.log("Express server listening on port %d in %s mode", 3000, server.settings.env);
