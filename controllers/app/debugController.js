var debugController,
    renderer = require("../../util"),
    fhc         = require('fh-fhc'),
    http     = require("http"),

  debugController = {
    // every app gets the indexAction, which gets the file tree & passes on
    indexAction: function(req, res, next){
      var id = req.params.id;
      var d = {
          tpl:'app',
          title:'Debug',
          appId: id,
          data:{ inst : { guid : id}}, // TODO: This is same as appId - remove need for this!
          tab:'debug'
      };
      //TODO: Put in some console output in a pre
      renderer.doResponse(req, res, d);     
    }
};

module.exports = debugController;


