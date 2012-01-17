
var appsController,
    renderer    = require("../util"),
    util = require("util"),
    fhc         = require("fh-fhc");

appsController = {
    indexAction : function (req,res) {
        fhc.apps([], function (err, data) {
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
    /*
     * Show a view specific to an instance of an app. 
     * Operates on:
     * GET /app/someGUID/viewName
     * where viewName is the name of one of our views, e.g. preview, editor, ...
     * viewName is optional - if left out, defaults to 'dashboard' 
     */
    showAppView : function (req,res){
        var id = req.params.id,
            view = req.params.view,
            subOp = req.params.subOp;
        // We have an ID - show an individual app
        fhc.apps([id], function (err, data) {
            if (err) {
                renderer.doError(res,req, "Couldn't find app with id" + id);
                return;
            }
            if (!view) {
                view = 'dashboard';
            }
            // show tab relating to this view
            if (view === "editor") {
                fhc.files(['list', id], function (err, root) {
                    if (err) {
                        renderer.doError(res,req, "Error retrieving files list");
                        return;
                    }
                    var list = JSON.stringify(root);

                    if (subOp) {
                        fhc.files(['read', subOp], function (err, file) {
                            if (err) {
                                renderer.doError(res,req, "Error loading file " + file);
                                return;
                            }
                            var d = {
                                title:file.fileName,

                                appID: id,
                                tpl:'app',
                                data:data,
                                tab:view,
                                filesTree:list,
                                fileContents:file.contents,
                                fileID: file.guid,
                                mode:'js'
                            };
                            renderer.doResponse(req, res, d);
                        });
                    } else {
                        var d = {
                            title:'Editor',
                            appID: id,
                            tpl:'app',
                            data:data,
                            tab:view,
                            filesTree:list,

                            fileContents:false,
                            mode:'js'

                        };
                        renderer.doResponse(req, res, d);
                    }
                });//end fhc call

            } else {
                var d = {
                    tpl:'app',
                    title:'Login',
                    data:data,
                    tab:view
                };
                renderer.doResponse(req, res, d);
            }
        });

    },
    /*
     * Do a write operation on an app 
     * Operates on:
     * POST /app/someGUID/operationName
     * where operationName is the name of some write operation on this app
     */
    doOperation : function(req,res){
      var guid = req.params.id,
      operation = req.params.operation,
      body = req.body,
      fileID = req.params.fileID || body.fileID;
      
      // Transform this request to always be an API one - means doResponse will always just return data:
      req.params.resType = "json";
      
      
      switch(operation){
      case "update":
        var fileContents = body.fileContents;
        var obj = { fileContents: fileContents };
        fhc.files(['update', guid, fileID, obj], function(err, succ){
          if (!err){
            renderer.doResponse(req, res, { msg: 'File saved successfully' });  
          }else{
            renderer.doResponse(req, res, { msg: 'Error', error: err });
          }
            
        });
        
        //TODO: FHC Files update with a file's string content, not some file on the file system!
        
        
        
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


module.exports = appsController;