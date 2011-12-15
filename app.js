
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , fhc = require('fh-fhc')
  , util = require('util'),
  RedisStore = require('connect-redis')(express);

var app = module.exports = express.createServer();

// Load FHC
fhc.fhc.load({}, function(err) {
  if (err) console.log(err); //FIXME
  // Set cluster  
  fhc.target(['https://apps.feedhenry.com'], 
      function(err, data) {
        //success
        if (err) console.log(err); //FIXME
      }
    );
});


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyboard cat", store: new RedisStore }));
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Get Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Home',
    user: req.session.user
  });
});

app.get('/about', function(req, res){
  res.render('about', {
    title: 'About',
    user: req.session.user
  });
});

app.get('/signup', function(req, res){
  res.render('signup', {
    title: 'Signup',
    user: req.session.user
  });
});

app.get('/login', function(req, res){
  // Show login page
  res.render('login', {
    title: 'Login',
    user: req.session.user
  });
});

app.get('/apps', function(req, res){
  //Apps listing
  
  fhc.apps([], function(err, data){
    if (err){ 
      console.log(err); //FIXME
      return;
    }
    var apps = data.list;
    res.render('apps', {
      title: 'Apps',
      user: req.session.user,
      apps: apps
    });
  });
});

app.get('/apps/:id/:operation?', function(req, res){
  // Show a specific app operation
  var id = req.params.id;
  var operation = req.params.operation;
  // We have an ID - show an individual app
  fhc.apps([id], function(err, data){
    if (err) console.log(err); //FIXME
    if (!operation){
      operation = 'appDashboard';
    }
    // show tab relating to this operation
    if (operation==="editor"){
      fhc.files(['list', id], function(err, filesData){
        res.render('app', {
          title: 'Login',
          data: data,
          tab: operation,
          user: req.session.user,
          sidebar: 'filesTree',
          filesTree: util.inspect(filesData) 
        });  
      });
       
    }else{
      res.render('app', {
        title: 'Login',
        data: data,
        tab: operation,
        user: req.session.user
      });
    }
      
    });
  
});

app.get('/editor', function(req, res){
  res.render('editor', {
    title: 'Editor',
    user: req.session.user
  });
});

app.get('/logout', function(req, res){
  //debugger;
  fhc.logout([], function(err, data){
    console.log(arguments);
    if (err){
      console.log(err);
      return; // TODO: Show error logging out page
    }
    delete req.session.user;
    res.redirect('/');
  });
});

// Post routers

app.post('/login', function(req, res){
  // Login API operation
  var body = req.body,
  username = body.username,
  password = body.password;
  req.session.username = username,
  args = [username, password];
  
  fhc.login(args, function(err, data) {
    if (err){ 
      console.log(err); 
      return; // TODO: Render login error page.
    }
    if(data.result !== 'ok') console.log(util.inspect(data));
    
    console.log(util.inspect(data));
    
    req.session.user = username;
    res.redirect('/apps');
  });
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
