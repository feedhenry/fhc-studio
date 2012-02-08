var userDashController,
    renderer = require("../util"),
    fhc = require("fh-fhc");

userDashController = {
    loadDash:function (req, res) {
        var d;
        if (req.method === "POST") {
            //handle signup alternatively we could create a second method for
            //proccessing new signup and use app.post route
        } else if (req.method === "GET") {
            d = {
                tpl:'userdashboard',
                title:'My Dashboard'
            };
            renderer.doResponse(req, res, d);
        }
    }
};


module.exports = userDashController;