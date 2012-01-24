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

    gist : function (req,res){
        //todo send request when editor loads for fh gists and load into dom
        var https = require("https"),
            opts = {host:"api.github.com",path:"/gists/1099663",method:'GET'};
        https.get(opts,function(suc){
            if(suc){
                var content = "";
                console.log("suc");
                suc.on("data",function(data){
                    content+=data;
                });
                suc.on("end",function(){
                    //console.log(content);
                    var json = JSON.parse(content);
                    //console.log(json);
                    console.log(json.files['gistfile1.js'].content);
                    res.send(json.files['gistfile1.js'].content);
                });
            }
        });

    }
};

module.exports = editorController;


