var previewController,
    renderer = require("../../util"),
    fhc      = require('fh-module'),
    http     = require("http"),

  previewController = {
    // every app gets the indexAction, which gets the file tree & passes on
    indexAction: function(req, res, next){
      var id = req.params.id;
      var d = req.d || {};
      d.apply({
          tpl:'app',
          title:'Login',
          appId: id,
          //data:{ inst : { guid : id}}, // TODO: This is same as appId - remove need for this!
          tab:'preview',
          previewUrl: "http://" + req.session.domain + ".feedhenry.com/box/srv/1.1/wid/" + req.session.domain + "/studio/" + id + "/container"
        });
        renderer.doResponse(req, res, d);
       
    }
};

module.exports = previewController;


  