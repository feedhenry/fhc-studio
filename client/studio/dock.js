client.studio = client.studio || {};
client.studio.dock = {
  el: null,
  tab: null,
  items: { },

  socket: null,

  init: function() {
    var me = this;
    //create the socket connection to the server
    this.socket = io.connect('/');

    this.el = $("#dock");
    this.tab = this.el.find(".tab");
  },

  add: function(name) {
    var dock = this;

    if(!dock.expanded) {
      dock.expand();
    }

    return {
      el: $('<div class="item btn-group dropup">' +
              '<button class="btn">' + name + '</button>' + 
              '<button class="btn dropdown-toggle" data-toggle="dropdown">' +
                '<span class="caret"></span>' +
              '</button>' +
              '<ul class="dropdown-menu">' +
              '</ul>' +
          '</div>').appendTo(this.el),
      status: "idle",
      update: function(data) {
        console.log(data);

        this.status = data.status || "error";
        if(this.status === "complete") {
          this.el.addClass("complete");
          if(data.action && data.action.url) {
            this.el.click(function() {
              document.location = data.action.url;
            });
          }
        }
        else if(this.status === "error") {
          this.el.addClass("error");
        }


        this.el.attr("data-log", data.error ? data.error : data.log.pop());
      },
      poll: function(cacheKey) {
        var item = this;

        dock.socket.on(cacheKey, function(data) {
          item.update(data);
        });

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
    this.el.addClass("animate");
    this.el.removeClass("expanded");
  },

  expand: function() {
    this.el.addClass("animate");
    this.el.addClass("expanded");
  }
};
$(function() {
  client.studio.dock.init();
});