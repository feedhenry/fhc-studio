var appdController,
renderer = require("../../util"),
fhc      = require('fh-module'),
http     = require("http"),

appController = {
  // every app gets the indexAction, which gets the file tree & passes on
  indexAction: function(req, res, next){
    // TODO: Get builds from Redis / FHC?
    req.d = {};
    var dock = {
      builds: [ //TODO: Global controller?
        {
          destination: "Android",
          version: "2.3",
          config: "Debug",
          url: "http://www.tood.com"
        },
        {
          destination: "ios",
          version: "4.0",
          config: "Distribution",
          url: "http://www.tood.com"
        }
      ]
    };
    req.d.dock = dock;
    next();

  }
};

module.exports = appController;


