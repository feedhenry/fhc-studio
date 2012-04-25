
var fhc = require("fh-module");

var users = {
};

module.exports.handleSocket = function(socket) {
    
};


var cacheController = {
  handleSocket: function(socket) {

    socket.on("init", function(data) {

    });

    socket.on("poll", function(data) {
      if(data.cacheKey) {

      }
    }); 
  },

  initUser: function(data) {
    var userId = data.userId,
        user = users[userId] = users[userId] || {
      items: {}
    };
    
  },

  pollCache: function(options, user, cacheKey) {
    var user = users[userId] = users[userId] || {};

    fhc.api.waitFor(options, cacheKey, function(error, data) {
      //finished
    }, function() {
      //progress
      user.items[cacheKey] = data;
    });
  }

};


module.exports = cacheController;