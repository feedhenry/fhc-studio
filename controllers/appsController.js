
var appsController,
    renderer    = require("../util"),
    util = require("util"),
    fhc         = require("fh-fhc");

appsController = {
    indexAction : function (req, res, next) {    
      fhc.apps.list(function (err, data) {
        if (err) {
            renderer.doError(res, req, "Couldn't generate apps listing");
            return;
        }
        var d = {
            tpl:'apps',
            apps:data.list,
            title:'Apps'
        };
        renderer.doResponse(req, res, d);  
      });
    },
    createAction : function (req,res) {
      if(req.method === "GET"){
          d = {
              tpl : "createapp",
              data : {},
              title : "create an app"
          };
          return renderer.doResponse(req,res,d);
      }
      req.params.resType = "json";
      validate.appName(req.body.appname,function(err,suc){
          if(err)return renderer.doResponse(req,res,{msg:'Error',error:err});
          fhc.apps(["create",suc],function(err,data){
              if(err)renderer.doResponse(req,res,{ msg: 'Error', error: err });
              else renderer.doResponse(req,res,{msg : data});
          });
      });

    },
    deleteAction : function (req,res){
        req.params.resType = "json";
        validate.guid(req.body.guid,function(err,suc){
            fhc.apps(["delete",suc],function(err,data){
                if(err)return renderer.doResponse(req,res,{ msg: 'Error', error: err });
                else renderer.doResponse(req,res,{msg : data});
            });
        });
    }
};


module.exports = appsController;