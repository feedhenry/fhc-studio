var doResponse = undefined,
i18n = require('../client/lang/index.js'),
util = require('util');

doResponse = function (req, res, d) {
  var resType = (req.params.resType) ? req.params.resType : 'html',
      lang = "en";
      
      
  if (req && req.query && req.query.lang){
    var lang = req.query.lang;
    req.session.lang = lang;
  }else if (req.session && req.session.lang){
    lang = req.session.lang;
  }
  
  // setup stuff that goes into every response
  d.user = (req.session && req.session.user) ? req.session.user : false;
  d.domain = (req.session && req.session.domain) ? req.session.domain : "apps",
  d.env = (req.params.env) ? req.params.env : "production";
  d.lang = i18n[lang]; 
  
  switch(resType){
    case "jstpl":
      // API request - sending back JSON data with a template
      var template = getTemplateString(d);
      res.send({
        data: d,
        template: template
      });
      break;
      
    case 'json':
      res.send({
        data: d
      });
      break;
      
    default:
       // HTML page GET request - sending back a rendered page
      res.render("index", d);
      break;
      
  }
 };



module.exports = doResponse;
