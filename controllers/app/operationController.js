var operationController,
    renderer = require("../../util"),
    fhc      = require('fh-fhc'),
    http     = require("http"),
    validate = require("../../util/validation");

  operationController = {

    updateAction : function (req,res) {
        var guid            = req.params.id;
        var body            = req.body;
        var fileId          = req.params.fileId || body.fileId;
        var fileContents    = body.fileContents;
        var obj = { fileContents: fileContents };
        console.log(obj + " params" + guid + " "+fileId);
        req.params.resType = "json";
        validate.guid(guid,function (e,s) {
            if(e)return renderer.doResponse(req,res,{msg:'Error',error:e});
            else {
                fhc.files(['update', guid, fileId, obj], function(err, succ){
                    if (!err){

                        renderer.doResponse(req, res, { msg: 'File saved successfully' });
                    }else{
                        console.log(err);
                        renderer.doResponse(req, res, { msg: 'Error', error: err });
                    }

                });
            }
        } );
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




module.exports = operationController;