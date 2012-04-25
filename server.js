/**
 * Module dependencies.
 */

var express     = require('express'),
    socketio    = require('socket.io'),
    fhc         = require('./../fh-fhc'),
    util        = require('util'),
    fs          = require('fs'),
    less        = require('less'),
    controllers = require('./controllers');

var server = module.exports = express.createServer(),
    io = socketio.listen(server);

io.sockets.on("connection", controllers.socketController.handleSocket);

// Configuration

server.configure(function () {

    server.set('views', __dirname + '/views');
    server.set('view engine', 'jade');

    server.set('env',"local"); // Should this listen for --debug flag?

    server.use(express.bodyParser());
    server.use(express.cookieParser());

    server.use(express.methodOverride());
    
    var less = require('less');
    // Patch LESS require to allow relative and absolute both to work. Fix as per: https://github.com/senchalabs/connect/pull/174#issuecomment-1165151
    var origRender = less.render;
    less.render = function(str, options, fn) {
      if (typeof(options) === 'function') {
        fn = options;
        options = { paths: [__dirname + '/client/css'] };
      }
      return origRender.call(this, str, options, fn);
    };

    server.use(express.compiler({ src: __dirname + '/client', enable: ['less'] }));


    server.use(express.static(__dirname + '/client'));
});

server.configure('development', function () {
    server.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
    server.use(express.session({ secret:"keyboard cat"}));
    server.use(server.router);
});

server.configure('local', function () { // For now a clone of development, but we do a server.get('env') in places
  server.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
  server.use(express.session({ secret:"keyboard cat"}));
  server.use(server.router);
  
  controllers.init('apps'); //TODO: Remove this!!
});


server.configure('production', function () {
  server.use(express.errorHandler());
  var RedisStore  = require('connect-redis')(express);
  server.use(express.session({ secret:"keyboard cat", store:new RedisStore }));
  server.use(server.router);
  controllers.init('demo2');
});


/*
 * FIXME: Ace editor is looking for worker-javascript.js in all the wrong places. Override it's core, so it knows where to find this file
 * rather than having to do this crazy route
 */
server.get('*/worker-javascript.js', function(req, res){
  var workerJS = fs.readFileSync('client/js/lib/ace/worker-javascript.js', 'utf8'); // TODO: Make async so we can err handle
  res.send(workerJS);
});



var checkAuth = controllers.userController.checkAuth; // auth checking function
//index

server.get("/", checkAuth, controllers.dashboardController.loadDash);

server.get('/home.:resType?', checkAuth, controllers.dashboardController.loadDash);
//user actions
server.get('/register.:resType?', controllers.userController.signupAction);
server.get('/login.:resType?', controllers.userController.loginAction);
server.post('/login',controllers.userController.loginAction);
server.get('/logout', controllers.userController.logoutAction);

/*
 * Apps Actions
 */
server.get('/apps.:resType?', checkAuth, controllers.appController.indexAction);
server.all('/apps/create.:resType?',checkAuth,controllers.appController.createAction);
server.post('/app/delete',checkAuth,controllers.appController.deleteAction);

/*
 * App Actions
 */
server.post('/app/:id/create/:fileName?.:resType?',checkAuth,controllers.app.operationController.createAction);
server.post('/app/:id/read/:fileId?.:resType?',checkAuth,controllers.app.operationController.readAction);
server.post('/app/:id/update/:fileId.:resType?',checkAuth,controllers.app.operationController.updateAction);
server.post('/app/:id/delete/:fileId.:resType?',checkAuth,controllers.app.operationController.deleteAction);

// Refresh the files tree
server.get('/app/:id/files.:resType?', checkAuth, controllers.app.operationController.refreshTree); 

// user dashboard
server.get('/dashboard.:resType?', controllers.dashboardController.loadDash);

// app:dashboard
server.get('/app/:id.:resType?', checkAuth, controllers.app.dashboardController.indexAction);
server.get('/app/:id/dashboard.:resType?', checkAuth, controllers.app.dashboardController.indexAction);

// app:debug 
server.get('/app/:id/debug.:resType?', checkAuth, controllers.app.debugController.indexAction);
server.get('/app/:id/logs/:target?/:name?.:resType?', checkAuth, controllers.app.debugController.indexAction);

// app:preview, build, prefs
server.get('/app/:id/preview.:resType?', checkAuth, controllers.app.previewController.indexAction);
server.get('/app/:id/build.:resType?', checkAuth, controllers.app.buildController.indexAction);
server.get('/app/:id/prefs.:resType?', checkAuth, controllers.app.prefsController.indexAction);

// app:config
server.get('/app/:id/config.:resType?', checkAuth, controllers.app.configController.indexAction);
server.post('/app/:id/config.:resType?', checkAuth, controllers.app.configController.updateAction);

// app:editor
server.get('/app/:id/editor.:resType?', checkAuth, controllers.app.editorController.indexAction, controllers.app.editorController.blankEditor);
server.get('/app/:id/editor/:fileId.:resType?', checkAuth, controllers.app.editorController.indexAction, controllers.app.editorController.editorWithFile);

server.get("/editor/gist",controllers.app.editorController.gistAction);
server.get("/editor/gist/:gistid",controllers.app.editorController.gist);

server.listen(3000);

console.log("Express server listening on port %d in %s mode", 3000, server.settings.env);
