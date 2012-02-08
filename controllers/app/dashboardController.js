var dashboardController,
    renderer = require("../../util"),
    fhc         = require('fh-fhc'),
    http     = require("http"),

  dashboardController = {
    // every app gets the indexAction, which gets the file tree & passes on
    indexAction: function(req, res, next){
      var id = req.params.id;
      // We have an ID - show an individual app's dashboard
      fhc.apps([id], function (err, data) {
        if (err) {
            renderer.doError(res,req, "Couldn't find app with id" + id);
            return;
        }
      
        var d = {
          tpl:'app',
          title:'Dashboard',
          appId: id,
          data:data,
          tab:'dashboard',
          previewUrl: "http://" + req.session.domain + ".feedhenry.com/box/srv/1.1/wid/" + req.session.domain + "/studio/" + id + "/container"
        };
        renderer.doResponse(req, res, d);
      });      
  }
};

module.exports = dashboardController;


