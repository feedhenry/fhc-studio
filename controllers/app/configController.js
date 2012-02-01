var
    renderer = require("../../util"),

configController = {
  indexAction: function(req, res, next) {
    var id = req.params.id;
    var d = {
        tpl: 'app',
        title: 'Preferences',
        appId: id,
        data:{ inst : { guid : id}}, // TODO: This is same as appId - remove need for this!
        tab: 'config'
    };
    renderer.doResponse(req, res, d);
  }
};

module.exports = configController;

