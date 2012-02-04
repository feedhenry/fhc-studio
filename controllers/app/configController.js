var
    renderer = require("../../util"),
    fhc      = require('fh-fhc'),

configController = {
  indexAction: function(req, res, next) {
    var id = req.params.id;
    fhc.configuration(['list', id], function (err, cfg) {
      if (err) {
        renderer.doError(res, req, "Couldn't list configuration for app"); return;
      }
      var d = {
          tpl: 'app',
          title: 'Preferences',
          appId: id,
          data:{ inst : { guid : id}}, // TODO: This is same as appId - remove need for this!
          configuration: JSON.stringify(cfg),
          tab: 'config'
      };
      renderer.doResponse(req, res, d);
    });
  }
};

module.exports = configController;

