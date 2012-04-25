var buildController,
    renderer = require("../../util"),
    fhc      = require('fh-module'),
    http     = require("http");

  buildController = {
    // every app gets the indexAction, which gets the file tree & passes on
    indexAction: function(req, res, next){
      var id = req.params.id;
      var d = {
          tpl:'app',
          title:'Preferences',
          appId: id,
          data:{ inst : { guid : id}}, // TODO: This is same as appId - remove need for this!
          tab:'build'
      };
      //TODO: Put in some console output in a pre
      renderer.doResponse(req, res, d);
    },

    buildAction: function(req, res) {
      this._buildAction(req, function(error, data) {
        if(error) {
          renderer.doResponse(req, res, error);
        }
        else {
          renderer.doResponse(req, res, err);
        }
      });
    },

    _buildAction: function(req, cb) {
      var params = req.params,
        guid = params.guid;

      fhc.build(req.session, guid, params, cb);

    }

};

module.exports = buildController;
