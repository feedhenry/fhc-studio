var
    renderer = require("../../util"),
    fhc      = require('fh-fhc'),

    targetPlatforms = [
      {name: 'ipad',    title: 'iPad'},
      {name: 'iphone',  title: 'iPhone'},
      {name: 'android', title: 'Android'}
    ],

    configurationSchema = {
      fields: [],
      arrangement: [
        {title: 'Orientation'},
        {title: 'Other'}
      ],

      configurationPrettyListing: function(cfg) {
        var schema = this;
        return targetPlatforms.map(function(p, index) {
          var sections = schema.arrangement;
          return {name: p.name, title: p.title, sections: sections, active: index === 0};
        });
      }
    },


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
          configuration: configurationSchema.configurationPrettyListing(cfg),
          tab: 'config'
      };
      renderer.doResponse(req, res, d);
    });
  }
};

module.exports = configController;

