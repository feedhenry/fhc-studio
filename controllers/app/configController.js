var
    renderer = require("../../util"),
    fhc      = require('fh-module'),

    targetPlatforms = [
      {name: 'ipad',    title: 'iPad'},
      {name: 'iphone',  title: 'iPhone'},
      {name: 'android', title: 'Android'},
      {name: 'blackberry', title: 'BlackBerry'},
      {name: 'windowsphone7', title: 'Windows Phone 7'},
      {name: 'nokiawrt', title: 'Nokia WRT'}
    ],

    configurationSchema = {
      fields: {
        "app Id": {type: "string"},
        "version Name": {type: "string", title: "config.fields.versionName"},
        "version Code": {type: "string", title: "Version code"},
        "packages": {type: "string", title: "Packages TODO"},
        "flurry Application Key": {type: "string", title: "Flurry TODO"},
        "orientation": {type: "select",  title: "Orientation", constraint: ["portrait", "landscape"]},
        "auto Rotate": {type: "boolean", title: "Auto Rotate"},
        "permission Audio": {type: "boolean", title: "Permission: audio"},
        "permission Camera": {type: "boolean", title: "Permission: camera"},
        "permission Contacts": {type: "boolean", title: "Permission: contacts"},
        "permission Location": {type: "boolean", title: "Permission: location"},
        "permission Read Phone State": {type: "boolean", title: "Permission: read phone state"},
        "permission Receive SMS": {type: "boolean", title: "Permission: receive SMS"},
        "permission Vibrate": {type: "boolean", title: "Permission: vibrate"},
        "remote Debug": {type: "boolean", title: "Remote debug"},
        "activity Spinner": {type: "select",  title: "Activity spinner", constraint: ["Top"]},
        "hide Status Bar": {type: "boolean", title: "Hide Status Bar"},
        "splash Image": {type: "string", title: "Splash image"},
        "retina splash image": {type: "string", title: "Retina splash image"},
        "landscape splash image": {type: "string", title: "Landscape splash image"},
        "foreground Splash Image": {type: "string", title: "Foreground splash image"},
        "splash Background Color": {type: "string", title: "Splash background color"}
      },
      arrangement: [
        {name: 'general', fields: ["app Id", "flurry Application Key", "version Name", "version Code", "packages"]},
        {name: 'appearance', fields: ["orientation", "auto Rotate", "splash Image", "retina splash image", "landscape splash image", "foreground Splash Image", "splash Background Color", "activity Spinner", "hide Status Bar"]},
        {name: 'permissions', fields: ["permission Audio", "permission Camera", "permission Contacts", "permission Location", "permission Read Phone State", "permission Receive SMS", "permission Vibrate"]},
        {name: 'debug', fields: ["remote Debug"]}
      ],

      configurationPrettyListing: function(cfg) {
        var schema = this;
        return targetPlatforms.map(function(p, index) {
          var cfgForPlatform = cfg[p.name],
              fieldNames = Object.keys(cfgForPlatform),
              sections,
              fields = {};

          fieldNames.forEach(function(fname) {
            var fieldDef = schema.fields[fname]
            if (fieldDef) {
              fields[fname] = {name: fname, type: fieldDef.type, title: 'config.fields.' + fname.replace(/\s+/g, ''), constraint: fieldDef.constraint, value: cfgForPlatform[fname]};
            }
          });

          sections = schema.arrangement.map(function(sec) {
            var fieldsOfSection = sec.fields
                    .filter(function(fname) {return cfgForPlatform[fname] !== undefined;})
                    .map(function(fname) { return fields[fname]; });
            return {name: sec.name, title: 'config.sections.' + sec.name, fields: (fieldsOfSection.length > 0 && fieldsOfSection)};
          });

          return {platformName: p.name, title: p.title, sections: sections};
        });
      }
    },


configController = {
  indexAction : function(req, res, next) {
    var id = req.params.id;
    fhc.config.list(req.session, id, "all", function (err, cfg) {
      if (err) {
        renderer.doError(res, req, "Couldn't list configuration for app"); return;
      }
      var d = req.d || {};
      d.apply({
          tpl: 'app',
          title: 'Preferences',
          appId: id,
          data:{ inst : { guid : id}}, // TODO: This is same as appId - remove need for this!
          configuration: configurationSchema.configurationPrettyListing(cfg),
          tab: 'config'
      });
      renderer.doResponse(req, res, d);
    });
  },

  updateAction : function(req, res, next) {
    var updates = req.body && req.body.config,
        platform = req.body && req.body.config_for_platform,
        keys = Object.keys(updates),
        id = req.params.id,

        //TODO make it more efficient by sending "set" concurrently
        updateOne = function(err) {
          //not checking for error – whole operation is not atomic and breaking it in the middle is pure nonsense
          if (err) {
            console.log(err);
          }
          if (keys.length > 0) {
            var key = keys.shift();
            console.log('updating ' + key + ' => ' + updates[key]);
            fhc.config.set(req.session, id, platform, key, updates[key], updateOne);
          } else {
            configController.indexAction(req, res, next); //TODO Think about 302
          }
        };

    fhc.config.list(req.session, id, "all", function (err, cfg) {
      if (err) {
        renderer.doError(res, req, "Couldn't update configuration for app"); return;
      }
      keys = keys.filter(function(key) {
      	return (cfg[platform][key] && cfg[platform][key] !== updates[key]);
      });
      updateOne();
    });
  }
};

module.exports = configController;

