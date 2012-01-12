/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 12/01/2012
 * Time: 20:44
 * To change this template use File | Settings | File Templates.
 */
var editorController ,
    renderer = require("../util");

editorController = {
    indexAction : function (req,res) {
        var json = true, data;
        data = {
            tpl:'editor',
            title:'Editor'
        };
        renderer.doResponse(req, res, json, data);
    }
};

module.exports = editorController;


