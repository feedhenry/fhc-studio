
var appsController,
    renderer    = require("../util"),
    util = require("util"),
    fhc         = require("fh-fhc");

appsController = {
    indexAction : function (req, res, next) {
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
    }
};


module.exports = appsController;