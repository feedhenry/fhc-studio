var buildController,
    renderer = require("../../util"),
    fhc      = require('../../fh-module'),
    http     = require("http");

  buildController = {
    // every app gets the indexAction, which gets the file tree & passes on
    indexAction: function(req, res, next){
      var id = req.params.id;
      var d = req.d || {};
      d.apply({
        tpl:'app',
        title:'Preferences',
        appId: id,
        data:{ inst : { guid : id}}, // TODO: This is same as appId - remove need for this!
        tab:'build'
      });

      //TODO: Put in some console output in a pre
      renderer.doResponse(req, res, d);
    },

    buildAction: function(req, res) {

      buildController._buildAction(req, function(err, data) {
        if(err) {
          renderer.doResponse(req, res, err);
        }
        else {
          renderer.doResponse(req, res, data);
        }
      });
    },

    _buildAction: function(req, cb) {
      fhc.build(req.session, req.params.id, req.body, cb);
    }

};

module.exports = buildController;
