var editorController ,
    renderer = require("../../util"),
    fhc         = require('fh-fhc'),
    http     = require("http"),

editorController = {
    // every app gets the indexAction, which gets the file tree & passes on
    indexAction: function(req, res, next){
      var id = req.params.id;
      fhc.files(['list', id], function (err, root) {
        if (err) {
            renderer.doError(res,req, "Error retrieving files list");
            return;
        }
        var list = JSON.stringify(root);
        req.params.list = list;
        next();
      });     
    },
    blankEditor: function (req,res) {
      var id = req.params.id,
      list = req.params.list;
      var d = {
          title:'Editor',
          appId: id,
          data:{ inst : { guid : id}}, // TODO: This is same as appId - remove need for this!
          tpl:'app',
          tab:'editor',
          filesTree:list,
          fileContents:false,
          mode:'js'
      };
      renderer.doResponse(req, res, d);
    },
    editorWithFile: function(req, res){
      var id = req.params.id,
      fileId = req.params.fileId,
      list = req.params.list;
      fhc.files(['read', fileId], function (err, file) {
        if (err) {
            renderer.doError(res,req, "Error loading file " + file);
            return;
        }
        var d = {
            title:file.fileName,
            appId: id,
            data:{ inst : { guid : id}}, // TODO: This is same as appId - remove need for this!
            tpl:'app',
            tab:'editor',
            filesTree:list,
            fileContents:file.contents,
            fileId: file.guid,
            mode:'js'
        };
        renderer.doResponse(req, res, d);
      });
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


