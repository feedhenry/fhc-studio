var indexController, renderer = require("../util");

indexController = {
    indexAction : function (req,res) {
        var d;
        d = {
            tpl:'index',
            title:'Home'
        };
        renderer.doResponse(req,res,d);
    }
};


module.exports = indexController;
