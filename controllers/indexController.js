var indexController, renderer = require("../util");

indexController = {
    indexAction : function (req,res) {

        var loggedIn  = (req.session && req.session.user) ? req.session.user : false,
        d = undefined;
        
        if (loggedIn){
          d = {
              tpl:'home',
              title:'Home'
          };  
        }else{
          d = {
              tpl:'login',
              title:'Login'
          };
        }
        
        
        renderer.doResponse(req,res,d);
    }
};


module.exports = indexController;
