var editorController ,
    renderer = require("../util");

editorController = {
    indexAction : function (req,res) {
        var d;
        d = {
            tpl:'editor',
            title:'Editor'
        };
        renderer.doResponse(req, res, d);
    }
};

module.exports = editorController;


