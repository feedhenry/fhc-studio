
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

// Routes

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
  res.render('contact', {
    title: 'Login',
    user: req.session.user
  });
});

app.get('/apps', function(req, res){
  fhc.apps(['ke0l0aUiKTuj-jiw4J9x0nLQ'], function(err, data){
    if (err) console.log(err); //FIXME
    console.log(util.inspect(data));
  });
  res.render('app', {
    title: 'Apps',
    app: { title: 'test', id: '12', description: 'desc', w3c: 'w3cid'},
    user: req.session.username
  });
});

app.get('/app/:id?', function(req, res){
  console.log('/app');
  var id = req.params.id;
  if (!id){
    // Apps listing
    fhc.apps([], function(err, data){
      if (err) console.log(err); //FIXME
      var apps = data.list;
      res.render('apps', {
        title: 'Apps',
        user: req.session.user,
        apps: apps
      });
    });
  }else{
    // We have an ID - show an individual app
    fhc.apps([id], function(err, data){
      if (err) console.log(err); //FIXME
      console.log(util.inspect(data));
      var title = data.inst.title,
      w3cid = data.app.w3cid,
      description = data.inst.description;
      res.render('app', {
        title: 'Apps',
        data: data,
        user: req.session.user
      });
    });    
  }
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
    
    req.session.user = username;
    res.redirect('/app');
  });
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
