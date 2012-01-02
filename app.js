
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  fhc = require('fh-fhc'),
  util = require('util'),
  fs = require('fs'),
  ejs = require('ejs'),
  RedisStore = require('connect-redis')(express);

var app = module.exports = express.createServer();

// Load FHC
fhc.fhc.load({}, function(err) {
  if (err){
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

app.configure(function(){
  app.set('views', __dirname + '/public/views');
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

app.get('/home.:json?', function(req, res){
  var json = (req.params.json && req.params.json==="json") ? true : false;
  var d ={
      tpl: 'index',
      title: 'Home',
      user: req.session.user
   }; 
  doResponse(res, json, d);
});

app.get('/signup.:json?', function(req, res){
  var json = (req.params.json && req.params.json==="json") ? true : false;
  var d ={
      tpl: 'signup',
      title: 'Signup',
      user: req.session.user
  }; 
  doResponse(res, json, d);
});

app.get('/login.:json?', function(req, res){
  // Show login page
  var json = (req.params.json && req.params.json==="json") ? true : false;
  var d = {
    tpl: 'login',
    title: 'Login',
    user: req.session.user
  };
  doResponse(res, json, d);
});

app.get('/apps.:json?', function(req, res){
  //Apps listing
  var json = (req.params.json && req.params.json==="json") ? true : false;
  
  fhc.apps([], function(err, data){
    if (err){
      doError(res, "Couldn't generate apps listing", err);
      return;
    }
    var d = {
        tpl: 'apps',
        apps: data.list, 
        title: 'Apps', 
        user: req.session.user
    };
    doResponse(res, json, d);
  });
});

app.get('/apps/:id/:operation?/:subOp?.:json?', function(req, res){
  var json = (req.params.json && req.params.json==="json") ? true : false;
  
  // Show a specific app operation
  var id = req.params.id,
  operation = req.params.operation,
  subOp = req.params.subOp;
  
  // We have an ID - show an individual app
  fhc.apps([id], function(err, data){
    if (err){
      doError(res, "Couldn't find app with id" + id);
      return;
    }
    if (!operation){
      operation = 'appDashboard';
    }
    // show tab relating to this operation
    if (operation==="editor"){
      fhc.files(['list', id], function(err, root){
        var files = root.children,
        // TODO: This should be in the EJS template. 
        list = "<ul>";
        for (var i=0; i<files.length; i++){
          var file = files[i];
          list += "<li id='" + file.guid + "'>" + "<a href='/apps/" + id + "/editor/" + file.guid + "'>" + file.name + "</a>" + "</li>";
        }
        list += "</ul>";
        
        if (subOp){
          fhc.files(['read', subOp], function(err, file){
            var d = {
                title: file.fileName,
                tpl: 'app',
                data: data,
                tab: operation,
                user: req.session.user,
                sidebar: 'filesTree',
                filesTree: list,
                file: file.contents,
                mode: 'js'
             };
            doResponse(res, json, d);
          });
        }else{
          var d = {
              title: 'Editor',
              tpl: 'app',
              data: data,
              tab: operation,
              user: req.session.user,
              sidebar: 'filesTree',
              filesTree: list,
              file: false,
              mode: 'js'
          };
          doResponse(res, json, d);
        }
      });
       
    }else{
      var d = {
          tpl: 'app',
          title: 'Login',
          data: data,
          tab: operation,
          user: req.session.user
      };
      doResponse(res, json, d);
    }
    });
  
});

app.get('/editor', function(req, res){
  var json = true;
  var d = {
      tpl: 'editor',
      title: 'Editor',
      user: req.session.user
  };
  doResponse(res, json, d);
});

app.get('/logout', function(req, res){
  //debugger;
  fhc.logout([], function(err, data){
    console.log(arguments);
    if (err){
      doError(res, "Error logging out", err);
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
      doError(res, "Error logging in as user <strong>" + username + "</strong>. Please verify credentials and try again.", err);
      return;
    }
    if(data.result !== 'ok') console.log(util.inspect(data));
    
    console.log(util.inspect(data));
    
    req.session.user = username;
    res.redirect('/apps');
  });
});



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


function getTemplateString(d){
  var tpl = d.tpl;
  
  var template = fs.readFileSync('public/views/' + tpl + '.ejs', 'utf8'); // TODO: Make async so we can err handle
  
  // This is a bit crazy - EJS deprecated partials with no alternative, so we're implementing it using regex. 
  // No better templating engine exists at the moment, so sticking with EJS. 
  // Look for partials & replace them with content
  var rex = /<%- ?partial\((.*)\) ?%>/;
  if (rex.test(template)){
    // TODO: Support more than one partial in a file
    var match = rex.exec(template);
    if (match.length>0){
      // Now we're going to lookup the variable name in the data to see what the template should be called
      var variable = d[match[1]]; 
      
      // Recursively call ourselves with the TPL name we need
      var include = getTemplateString({tpl: variable});
      
      template = template.replace(match[0], include);
      console.log(template);  
    }
  }
  // End crazyness
  
  return template;
}

function doResponse(res, json, d){
  if (json){
    var template = getTemplateString(d);
    // API request - sending back JSON data with a template
    res.send({
      data: d,
      template: template,
    });  
  }else{
    // HTML page GET request - sending back a rendered page
    res.render(d.tpl, d);  
  }
  
}

function doError(res, msg){
  //var json = (req.params.json && req.params.json==="json") ? true : false;
  var json = false;
  var d ={
      tpl: 'error',
      title: 'Oops! An error has occured.',
      error: msg
  }; 
  doResponse(res, json, d);
}