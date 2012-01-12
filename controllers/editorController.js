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


