var operationController,
    renderer = require("../../util"),
    fhc      = require('fh-fhc'),
    http     = require("http"),
    validate = require("../../util/validation");

  operationController = {
    /*
     * Do a write operation on an app 
     * Operates on:
     * POST /app/someGUID/operationName
     * where operationName is the name of some write operation on this app
     */
    indexAction: function(req, res, next){
      var guid = req.params.id,
      operation = req.params.operation,
      body = req.body,
      fileId = req.params.fileId || body.fileId;
      
      // Transform this request to always be an API one - means doResponse will always just return data:
      req.params.resType = "json";
      
      
      switch(operation){
        case "update":
          var fileContents = body.fileContents;
          var obj = { fileContents: fileContents };
          fhc.files(['update', guid, fileId, obj], function(err, succ){
            if (!err){
              renderer.doResponse(req, res, { msg: 'File saved successfully' });  
            }else{
              renderer.doResponse(req, res, { msg: 'Error', error: err });
            }
              
          });
          break;
          
        default:
          // do sumat;
          break;
        
      } // end switch
    },
    createAction : function (req,res) {
        validate.appName(req.body.appname,function(err,suc){
            fhc.apps(["create",suc],function(err,data){
                if(err)renderer.doResponse(req,res,{ msg: 'Error', error: err });
                else renderer.doResponse(req,res,{msg : data});
            });
        });

    },
    deleteAction : function (req,res){
        validate.guid(req.body.guid,function(err,suc){
            fhc.apps(["delete",suc],function(err,data){
                if(err)renderer.doResponse(req,res,{ msg: 'Error', error: err });
                else renderer.doResponse(req,res,{msg : data});
            });
        });
    }
};




module.exports = operationController;