var operationController,
    renderer = require("../../util"),
    fhc      = require('./../../../fh-fhc'),
    http     = require("http"),
    validate = require("../../util/validation");

  operationController = {

    createAction : function(req, res){
      operationController._createFile(req, function(err, data){
        if (err){
          renderer.doResponse(req,res,err);
          return;
        }
        renderer.doResponse(req, res, data);
        return;
      });
      
    }, // end createAction
    readAction : function(req, res){
      // TODO - Complete this and have editorController consume it, or expose it as new endpoint to the studio
    },
    updateAction : function (req,res) {
      operationController._updateFile(req, function(err, data){
        if (err){
          renderer.doResponse(req,res,err);
          return;
        }
        renderer.doResponse(req, res, data);
        return;
      });
    },
    deleteAction : function(req, res){
      operationController._deleteFile(req, function(err, data){
        if (err){
          renderer.doResponse(req,res,err);
          return;
        }
        renderer.doResponse(req, res, data);
        return;
      });
    },
    refreshTree: function(req, res) {
      req.params.resType = "json";

      operationController._listFiles(req, function(err, data) {
        if (err){
          renderer.doResponse(req,res,err);
          return;
        }
        renderer.doResponse(req, res, data);
        return;
      });
    },
    _createFile : function(req, cb){
      var guid = req.params.id,
      body = req.body,
      path = body.path,
      name = req.params.fileName || body.name,
      type = body.type;
      req.params.resType = "json";
      
      validate.guid(guid,function (e,s) {
          if(e){
            return cb({ msg:'Error',error:e}, null);
          }
          else {          
            fhc.files.create(guid, path, name, type, function(err, data){
                if (err){
                    console.log(err);
                    return cb({ msg: 'Error', error: err }, null);
                    
                }
                /*
                 * We've now created a file - we need to update it's contents with
                 * the new fileID we just got back from the server.
                 */
                req.body.fileId = data.guid;
                operationController._createFile(req, function(err, data){
                  if (err){
                    errorString = err.err || err;
                    return cb({ msg: 'Error', error: 'File created successfully, but not updated: ' + errorString }, null);
                  }
                  return cb(null, { msg: 'File created successfully' });
                });
            }); // end fhc files
          }
      }); // end validation
    },// end _createFile
    _readFile : function(req, cb){
      // TODO: Complete this.
    },
    _updateFile : function(req, cb){
      var guid            = req.params.id;
      var body            = req.body;
      var fileId          = req.params.fileId || body.fileId;
      var fileContents    = body.fileContents;
      var obj = { fileContents: fileContents };
      console.log(obj + " params" + guid + " "+fileId);
      req.params.resType = "json";
      validate.guid(guid,function (e,s) {
          if(e){
            return cb({msg:'Error',error:e}, null);
          }
          else {
              fhc.files(['update', guid, fileId, obj], function(err, succ){
                  if (!err){
                      cb(null, { msg: 'File saved successfully' });
                  }else{
                      console.log(err);
                      cb({ msg: 'Error', error: err }, null);
                  }
              }); // end fhc.files.update
          } // end else
      }); // end validate
    }, // end _updateFile

    _deleteFile : function(req, cb){
      var guid = req.params.id,
      body = req.body,
      path = body.path,
      name = req.params.fileName || body.name,
      fileId = req.params.fileId || body.fileId,
      type = body.type;
      req.params.resType = "json";
      fhc.files.deleteFile(guid , fileId, path, name, type, function(err, succ){
        if (err){
          return cb({ msg: 'Error', error: err }, null);
        }
        return cb(null, { msg: 'File deleted successfully' });
      });
    },

    _listFiles: function(req, cb) {
      var guid = req.params.id;

      fhc.files.list(guid, function (err, root) {
        if (err) {
          renderer.doError(res,req, "Error retrieving files list");
          return;
        }
        var list = JSON.stringify(root);

        return cb(null, {
          msg: 'File list was successful.',
          files: list
        });
      });  
    }

};

module.exports = operationController;