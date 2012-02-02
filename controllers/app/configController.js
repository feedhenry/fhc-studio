var
    renderer = require("../../util"),
    fhc      = require('fh-fhc'),
    http     = require("http"),

    //TODO should be moved somewhere, this is not related to app model, not controller
    configurationSchema = {
      fields: {
        appId: {type: 'string'},
        versionName: {type: 'string',  title: 'Version Name'},
        packages:    {type: 'string',  title: 'Packages'},
        orientation: {type: 'select',  constraint: ['Portrait', 'Landscape'], title: 'Orientation'},
        autoRotate:  {type: 'boolean', 'default': true, title: 'Auto Rotate'}
      },
      arrangement: [
        {title: 'Orientation', fields: ['orientation', 'auto rotate']},
        {title: 'Other'}
      ]
   /*   platforms: {
        android: ['appId', 'versionName', 'packages', 'orientation', 'autoRotate'],
        iphone:  ['appId', 'versionName', 'packages', 'orientation', 'autoRotate'],
        ipad:    ['appId', 'versionName', 'packages', 'orientation', 'autoRotate']
      }*/
    },

    targetPlatforms = [
      {name: 'ipad', title: 'iPad'},
      {name: 'iphone', title: 'iPhone'},
      {name: 'android', title: 'Android'}
    ],

organizeConfigurationOptionsForTargetPlatforms = function(platforms, currentConf) {
  var sections;
  return platforms.map(function(p) {
    sections = configurationSchema.arrangement.map(function(s) {
      //s.fields.map(function(fname){});
      return {title: s.title, fields: []};
    });
    return {name: p.name, title: p.title, sections: sections};
  });
},

configController = {
  indexAction: function(req, res, next) {
    var id = req.params.id,
        configurablePlatforms,
        sections;
    fhc.configuration(['list', id], function (err, currentConf) {
      if (err) {
        renderer.doError(res, req, "Couldn't list configuration for app");
        return;
      }
      var d = {
          tpl: 'app',
          title: 'Preferences',
          appId: id,
          data:{ inst : { guid : id}}, // TODO: This is same as appId - remove need for this!
          configuration: organizeConfigurationOptionsForTargetPlatforms(targetPlatforms, currentConf),
          tab: 'config'
      };
      renderer.doResponse(req, res, d);
    });
  }
};

module.exports = configController;

