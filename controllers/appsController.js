
var appsController,
    renderer    = require("../util"),
    fhc         = require("fh-fhc");

appsController = {
    indexAction : function (req,res) {
        fhc.apps([], function (err, data) {
            if (err) {
                renderer.doError(res, req, "Couldn't generate apps listing");
                return;
            }
            var d = {
                tpl:'index',
                apps:data.list,
                title:'Apps',
            };
            renderer.doResponse(req, res, d);
        });
    },
    performoperationAction : function (req,res){
        var id = req.params.id,
            operation = req.params.operation,
            subOp = req.params.subOp;
        // We have an ID - show an individual app
        fhc.apps([id], function (err, data) {
            if (err) {
                renderer.doError(res,req, "Couldn't find app with id" + id);
                return;
            }
            if (!operation) {
                operation = 'appDashboard';
            }
            // show tab relating to this operation
            if (operation === "editor") {
                fhc.files(['list', id], function (err, root) {
                    if (err) {
                        renderer.doError(res,req, "Error retrieving files list");
                        return; // TODO: Show error logging out page
                    }
                    var list = JSON.stringify(root);

                    if (subOp) {
                        fhc.files(['read', subOp], function (err, file) {
                            if (err) {
                                renderer.doError(res,req, "Error loading file " + file);
                                return; // TODO: Show error logging out page
                            }
                            var d = {
                                title:file.fileName,
                                tpl:'index',
                                data:data,
                                tab:operation,
                                filesTree:list,
                                file:file.contents,
                                mode:'js'
                            };
                            renderer.doResponse(req, res, d);
                        });
                    } else {
                        var d = {
                            title:'Editor',
                            tpl:'index',
                            data:data,
                            tab:operation,
                            filesTree:list,
                            file:false,
                            mode:'js',
                            isEditor: true
                        };
                        renderer.doResponse(req, res, d);
                    }
                });//end fhc call

            } else {
                var d = {
                    tpl:'index',
                    title:'Login',
                    data:data,
                    tab:operation
                };
                renderer.doResponse(req, res, d);
            }
        });

    }
};


module.exports = appsController;