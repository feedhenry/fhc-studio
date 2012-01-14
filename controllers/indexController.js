var indexController, renderer = require("../util");

indexController = {
    indexAction : function (req,res) {
        var d;
        d = {
            tpl:'index',
            title:'Home'
        };
        res.render("index",{title:"home page"});
    }
};


module.exports = indexController;
