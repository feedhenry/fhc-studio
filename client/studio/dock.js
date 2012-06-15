client.studio = client.studio || {};
client.studio.dock = {
  el: null,
  tab: null,
  items: { },
  inited: false,
  socket: null,

  init: function() {
    this.inited = true;

    var me = this;
    //create the socket connection to the server
    this.socket = io.connect('/'); // TODO: This should be inited seperate to the dock, we might use the socket elsewhere?

    this.el = $("#dockContainer");
    this.dock = $("#dockContainer #dock");
    this.tab = this.el.find("#dockControls");
    $(this.tab).on('click', function(){
      if (me.el.hasClass('expanded')){
        me.collapse();
      }else{
        me.expand();
      }
    });
  },

  add: function(data) {
    var dock = this,
    platform = data.destination,
    ver = data.version,
    config = data.config;

    if(!dock.expanded) {
      dock.expand();
    }

    return {
      el: $('<div class="item btn-group dropup">' +
              '<div class="progress progress-info progress-striped active">'+
                '<div class="bar" style="width: 0%;"></div>'+
              '</div>' +
              '<span class="platform ' + platform + '"> <i class="icon-screenshot" />' + platform + '</span> | ' +
              '<span class="version' + ver + '"><strong>V</strong>' + ver + '</span> | ' +
              '<span class="config + ' + config + '"> <i class="icon-wrench" /> ' + config + '</span>' +
          '</div>').prependTo(this.dock),
      status: "idle",
      update: function(data) {
        this.status = data.status || "error";
        if(this.status === "complete") {
          var barC = $('div.progress');
          barC.removeClass('progress-info');
          barC.removeClass('active');
          barC.addClass('progress-success');
          this.el.addClass("complete");
          if(data.action && data.action.url) {
            window.location = data.action.url;
          }
        }
        else if(this.status === "error") {
          this.el.addClass("error");
        }

        var latestMsg = data.error ? data.error : data.log.pop();
        var progress = this.getProgress(latestMsg);

        if (progress) {
          this.updateProgress(progress);
        }

        this.el.find('.progress .bar').html(latestMsg);

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
      },
      getProgress: function(message){
        var curP = this.p,
        p = 0;
        switch(message){
          // android specific?
          case "Copy icon file...":
            p = 10;
            break;



           // ios specific
          case "Copy application files...":
            p = 10;
            break;

          case "Copy asset files...":
            p = 20;
            break;

          case "Copy index file...":
            p = 30;
            break;


          // Generic
          case "Processing...":
            p = (curP < 30) ? 30 : curP;
            if (curP<75){
              p += 3;
            }
            break;

          case "Packaging app...":
            p = 75;
            break;

          case "Generating app files...":
            p = 75;
            break;

          case "Build complete":
            p = 100;
            break;

          default:
            p=false;
            break;
        }
        this.p = p;

        return p;
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
