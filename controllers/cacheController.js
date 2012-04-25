
var fhc = require("fh-module");

var users = {
};


var cacheController = {
  handleSocket: function(socket) {

    socket.on("poll", function(data) {
      if(data.cacheKey) {
        cacheController.pollCache(socket, data.cacheKey);
      }
    }); 
  },

  pollCache: function(socket, cacheKey) {
    var session = socket.handshake.session;

    fhc.api.waitFor(session, cacheKey, function(error, data) {
      //user.items[cacheKey] = data;

      socket.emit("update", data);
    });
  }

};


module.exports = cacheController;