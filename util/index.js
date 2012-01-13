/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 12/01/2012
 * Time: 19:13
 * To change this template use File | Settings | File Templates.
 */



var fs          = require('fs'),
    doResponse,
    doError;


 doResponse = function (req, res, d) {
   var resType = (req.params.resType) ? req.params.resType : 'html';
   
   // setup stuff that goes into every response
   
   d.user = (req.session && req.session.user) ? req.session.user : false;
   d.domain = (req.session && req.session.domain) ? req.session.domain : "apps";
   switch(resType){
     case "jstpl":
       // API request - sending back JSON data with a template
       var template = getTemplateString(d);
       res.send({
         data: d,
         template: template,
       });
       break;
       
     case 'json':
       res.send({
         data: d
       });
       break;
       
     default:
        // HTML page GET request - sending back a rendered page
       res.render(d.tpl, d);
       break;
       
   }
};


doError = function (res,req, msg) {
    var d = {
        tpl:'error',
        title:'Oops! An error has occured.',
        error:msg
    };
    doResponse(req, res, d);
};

//private function
function getTemplateString(d) {
  var tpl = d.tpl;
  
  //TODO: Check redis first for template. If it doesn't exist, do this:
  var template = fs.readFileSync('public/views/' + tpl + '.ejs', 'utf8'); // TODO: Make async so we can err handle
  
  
  // This is a bit crazy - EJS deprecated partials with no alternative, so we're implementing it using regex. 
  // No better templating engine exists at the moment, so sticking with EJS. 
  // Look for partials & replace them with content
  
  // 1.) First look for quote-includes like <%- partial("someFile") %>
  var rex = /<%- ?partial\( ?"([a-zA-Z\/.]*)" ?\) ?%>/g;
  var match = rex.exec(template);
  while(match!=null){
    if (match.length>0){
      // Recursively call ourselves with the TPL name we need
      var include = getTemplateString({tpl: match[1]});
      template = template.replace(match[0], include);
    }
    match = rex.exec(template);
  }

  var match = rex.exec(template);
  while(match!=null){
    if (match.length>0){
      // Now we're going to lookup the variable name in the data to see what the template should be called
      var variable = d[match[1]]; // TODO: Cater for this failing, d[match[1]] being undefined
      // Recursively call ourselves with the TPL name we need
      var include = getTemplateString({tpl: variable});
      
      template = template.replace(match[0], include);
    }
    match = rex.exec(template); 
  }
  
  // <%- someVar %> isn't valid on the client side - replace with <%= 
  var rex = /<%- ([a-zA-Z])+ %>/g
  var match = rex.exec(template);
  while(match!=null){
    template = template.replace(match[0], "<%= filesTree %>");
    match = rex.exec(template);
  }
  // End crazyness
  
  //TODO: Store final generated template doesn't exist in redis.
  //TODO: Store list of unknown templates, bind this to 1k entries or so
    
  return template;
}



exports.doResponse  = doResponse;
exports.doError     = doError;