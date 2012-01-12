/**
 * @Author Craig Brookes
 * @Description indexController handles requests
 * to the home page
 */


var indexController, renderer = require("../util");

indexController = {
    indexAction : function (req,res) {
        var json, data;
        json = (req.params.json && req.params.json === "json") ? true : false;
        data = {
            tpl:'index',
            title:'Home'
        };
        renderer.doResponse(req,res,json,data);
    }
};


module.exports = indexController;