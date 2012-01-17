var editorController ,
    renderer = require("../util"),
    http     = require("http"),

editorController = {
    indexAction : function (req,res) {
        var d;
        d = {
            tpl:'editor',
            title:'Editor'
        };
        renderer.doResponse(req, res, d);
    },
    gistAction :  function (req,res){
        var content = "";
        //http://gist.github.com/api/v1/:format/:gist_id
        //https://api.github.com/gists/1099663
        http.get({host:"https://api.github.com",path:"/gists/1099663/"},function(hres){
            hres.on("data", function (chunk) {
                // append this chunk to our growing `data` var
                content+= chunk;
            });
            hres.on("end",function(){
                res.send(content);
            });
        },function(err){
            res.send(err);
        });


    }
};

module.exports = editorController;


