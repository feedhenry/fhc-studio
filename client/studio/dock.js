client.studio = client.studio || {};
client.studio.dock = {
  el: null,
  tab: null,
  expanded: false,

  socket: null,

  init: function() {
    var me = this;
    //create the socket connection to the server
    this.socket = io.connect('http://localhost:3000');

    this.el = $("#dock");
    this.tab = this.el.find(".tab");
  },

  add: function(name) {
    var dock = this;

    if(!dock.expanded) {
      this.expand();
    }

    return {
      el: $('<div class="item btn-group dropup">' +
              '<button class="btn">' + name + '</button>' + 
              '<button class="btn dropdown-toggle" data-toggle="dropdown">' +
                '<span class="caret"></span>' +
              '</button>' +
              '<ul class="dropdown-menu">' +
              '</ul>' +
          '</div>').appendTo(dock.el),
      status: "idle",
      update: function(data) {
        console.log(data);

        this.status = data.status || "error";
        if(this.status === "complete") {
          this.el.addClass("complete");
          this.el.click(function() {
            document.location = data.action.url;
          });
        }
        else if(this.status === "error") {
          this.el.addClass("error");
        }

        this.el.attr("data-log", data.error ? data.error : data.log.pop());
      },
      poll: function(cacheKey) {
        var item = this;

        //listen for updates for the cachekey
        dock.socket.on(cacheKey, function(data) {
          item.update(data);
        });

        //initiate polling for the cache key
        dock.socket.emit("poll", {
          cacheKey: cacheKey
        });
      }
    };
  },

  remove: function(cacheKey) {
    var item = this.items[cacheKey];
    item.remove();
  },

  collapse: function() {
    this.expanded = false;
    this.el.addClass("animate");
    this.el.removeClass("expanded");
  },

  expand: function() {
    this.expanded = true;
    this.el.addClass("animate");
    this.el.addClass("expanded");
  }
};
$(function() {
  client.studio.dock.init();
});