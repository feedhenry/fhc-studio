var operationController,
    renderer = require("../../util"),
    fhc         = require('fh-fhc'),
    http     = require("http"),

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
          
        case "create":
          // do sumat
          break;
          
        default:
          // do sumat;
          break;
        
      } // end switch
    }
};

module.exports = operationController;