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
              '<div class="progress progress-striped active">'+
                '<div class="bar" style="width: 40%;"></div>'+
              '</div>' +
              '<strong>' + name + '</strong>' +
              '<span class="dockBuildStatus"></span>' +
          '</div>').appendTo(this.el),
      status: "idle",
      update: function(data) {
        console.log(data);

        this.status = data.status || "error";
        if(this.status === "complete") {
          this.el.addClass("complete");
          this.updateProgress(100);
          if(data.action && data.action.url) {
            window.location = data.action.url;
            this.el.click(function() {
              document.location = data.action.url;
            });
          }
        }
        else if(this.status === "error") {
          this.el.addClass("error");
        }

        var latestMsg = data.error ? data.error : data.log.pop();
        this.el.find('.dockBuildStatus').html(latestMsg);

        //this.el.attr("data-log", latestMsg);
      },
      updateProgress: function(progress){
        this.el.find('.progress .bar').width(progress+ '%');
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