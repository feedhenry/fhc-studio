var userDashController,
    renderer = require("../util"),
    util = require("util"),
    fhc = require("fh-fhc");

userDashController = {
    loadDash:function (req, res, next) {
        fhc.apps([], function (err, data) {
            if (err) {
                renderer.doError(res, req, "Couldn't generate apps listing");
                return;
            }
            var d = {
                tpl:'userdashboard',
                apps:data.list,
                title:'userDashboard'
            };
            renderer.doResponse(req, res, d);  
            
        });
    }
};


module.exports = userDashController;