var
    renderer = require("../../util"),

configController = {
  indexAction: function(req, res, next) {
    var id = req.params.id;
    var d = {
        tpl: 'app',
        title: 'Preferences',
        appId: id,
        data: {},
        tab: 'config'
    };
    renderer.doResponse(req, res, d);
  }
};

module.exports = configController;

